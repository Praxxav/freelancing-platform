import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin" />
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                    <p className="text-sm text-gray-600 text-center">
                        By signing In, you agree to our{" "}
                        <a href="#" className="text-black font-semibold hover:underline">
                            Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-black font-semibold hover:underline">
                            Privacy Policy
                        </a>.
                    </p>
                </div>
            </div>
    </div>
}
export default Signin; 