import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadImage } from "@/api/upload.service";
import { useNavigate } from "react-router-dom";
import { createAvatar } from "@/api/avatar.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  tile_size: z.number().min(10).max(100),
  image: z.string().uuid({
    message: "Please upload image",
  }),
});

const AvatarDetails = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tile_size: 64,
      image: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadingImage(true);
      const file = e.target.files[0];
      const result = await uploadImage(file, "avatar");
      if (result.status) {
        form.setValue("image", result.data.id);
      }
      setUploadingImage(false);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await createAvatar(data);
    if (result.status) {
      navigate("/avatar");
    }
  }

  return (
    <div className="flex h-full justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Avatar</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="tile_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tile Size</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Tile size in pixels"
                      className="w-24"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </FormControl>
                  <FormMessage />
                  {uploadingImage && (
                    <p className="text-sm text-blue-500">Uploading...</p>
                  )}
                  {field.value && (
                    <p className="text-sm text-gray-600">
                      Uploaded: {field.value}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
              <Button type="submit" className="w-full md:w-auto px-8">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AvatarDetails;
