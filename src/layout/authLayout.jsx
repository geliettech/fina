import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export const AuthLayout = ({ title,
  description,
  children,
  footer }) => {
  return (
    <div className="">
      <div className="container flex items-center justify-center min-h-screen bg-background">
        <div className="max-md:hidden">
          <img src="" alt="Auth Image" />
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader className="py-6 text-left">
            <CardTitle className="w-full max-w-sm h5">{title}</CardTitle>
            <CardDescription className="body-3">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          {footer && (
            <CardFooter className="flex-col gap-2">
              {footer}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}