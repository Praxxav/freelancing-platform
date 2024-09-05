import { createBlogInput, updateBlogInput } from "@praxav99/freelancing"; // Adjust import paths as necessary
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
export const servicesRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }, 
    Variables: {
      userId: string;
    }
  }>();
  
  // Middleware for token verification
  servicesRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
  
    if (!token) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  
    try {
      const response = await verify(token, c.env.JWT_SECRET);
      if (response.id) {
        //@ts-ignore
        c.set("userId", response.id);
        await next();
      } else {
        c.status(403);
        return c.json({ error: "unauthorized" });
      }
    } catch (e) {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  });
  
  // GET route to fetch services for the dashboard
  servicesRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const services = await prisma.service.findMany({
        select: {
          id: true,
          title: true,
          content: true,
        },
      });
  
      return c.json({ services });
    } catch (e) {
      c.status(500);
      return c.json({ error: "Internal server error" });
    }
  });

// PUT route to update a service
servicesRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success, error } = updateBlogInput.safeParse(body);
    if (!success) {
        console.error("Validation error:", error);
        c.status(411);
        return c.json({ message: "Inputs not correct" });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const service = await prisma.service.update({
            where: {
                id: body.id
            }, 
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({ id: service.id });
    } catch (e) {
        console.error("Error updating service:", e);
        c.status(500); // Internal Server Error
        return c.json({ error: "Internal server error" });
    }
});

// GET route to fetch services in bulk
servicesRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const services = await prisma.service.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({ services });
    } catch (e) {
        console.error("Error fetching services:", e);
        c.status(500); // Internal Server Error
        return c.json({ error: "Internal server error" });
    }
});

// GET route to fetch a single service by ID
servicesRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const service = await prisma.service.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({ service });
    } catch (e) {
        console.error("Error fetching service:", e);
        c.status(500); // Internal Server Error
        return c.json({ message: "Error while fetching service" });
    }
});
