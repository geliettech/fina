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
  footer, imgTitle, imgSubtitle }) => {
  return (
    <div className="">
      <div className="container flex items-center justify-center min-h-screen bg-background gap-8 py-8 w-full">
        <div className="hidden lg:block min-h-screen bg-linear-to-r from-sidebar-foreground to-sidebar-foreground/80 text-sidebar flex-1 rounded-3xl shadow-sm p-8">
          <div className="rounded-2xl border border-sidebar/15 bg-sidebar/10 p-4 backdrop-blur-sm">
          <h2 className="h3">{imgTitle}</h2>
            <p className="mt-4 max-w-sm body-3">{imgSubtitle}</p>
          </div>
          
        </div>
        <Card className="flex-1">
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
