import AddIcon from "@/components/icons/add-icon"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingIcon from "@/components/icons/loading-icon"
import BackIcon from "@/components/icons/back-icon"
import { useAdd } from "@/hooks/authenticator/use-add"
import { useAccount } from "wagmi"
import { toast } from "sonner"
import { toByte20 } from "@/lib/utils"

const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  issuer: z.string().optional(),
  key: z.string().min(16, "Key must be at least 16 characters long"),
})

const AddManually: FC = () => {
  const { address } = useAccount()
  const addMutation = useAdd()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      issuer: "",
      key: "",
    },
  })

  const onSubmit = async (form: z.infer<typeof formSchema>) => {
    const lastSignInData = localStorage.getItem(`lastSignIn_${address}`)
    if (!lastSignInData)
      return toast.error("No sign-in data found. Please sign in first.")

    const auth = JSON.parse(lastSignInData)

    await addMutation.mutateAsync({
      auth,
      label: form.label,
      issuer: form.issuer ?? "",
      secret: toByte20(form.key),
      timestep: 30,
    })
  }
  
  return (
    <Drawer direction={"right"}>
      <DrawerTrigger>
        <div className="flex items-center gap-3 p-6 border-t border-[#EEEEEE] dark:border-[#002827] cursor-pointer">
          <Button
            className="rounded-full h-8 w-8 border-none"
            variant="outline"
            size="icon"
          >
            <AddIcon className="h-4 w-4 text-[#002D2B] dark:text-white" />
            <span className="sr-only">Add Manually</span>
          </Button>
          <p>Add Manually</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-screen flex flex-col">
        <DrawerHeader className="flex-shrink-0" />
        <div className="flex-shrink-0 flex flex-col gap-2 mx-6 my-4 mb-10">
          <h1 className="text-2xl font-semibold">Enter Account Details</h1>
          <p className="text-sm">
            Add a new 2FA account by entering the required details below.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-grow overflow-y-auto space-y-8 mx-6 pb-24"
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl h-12 bg-muted border-none"
                      placeholder="e.g. My Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issuer (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl h-12 bg-muted border-none"
                      placeholder="e.g. Google"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Key</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl h-12 bg-muted border-none"
                      placeholder="Enter your 2FA key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-shrink-0 absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-6">
              <Button
                className="h-14 rounded-full gap-2 w-full"
                type="submit"
                disabled={addMutation.isPending}
              >
                Add Account{" "}
                {addMutation.isPending ? (
                  <LoadingIcon />
                ) : (
                  <BackIcon className="w-3 h-3 text-primary-foreground rotate-180" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export default AddManually
