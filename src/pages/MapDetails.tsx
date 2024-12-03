import { createMap } from "@/api/map.service";
import { uploadImage } from "@/api/upload.service";
import EditableJsonArray from "@/components/EditableJsonArray";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(5).max(50),
  row: z.number().min(10).max(50),
  column: z.number().min(10).max(100),
  tile_size: z.number().min(10).max(100),
  layers: z.array(z.array(z.number().min(0))).min(1),
  solid_tile: z.array(z.number().min(0)),
  tile_set: z.string().uuid({
    message: "Please upload tile set",
  }),
  thumbnail: z.string().uuid({
    message: "Please upload Thumbnail",
  }),
});

const MapDetails = () => {
  const [uploadingTileSet, setUploadingTileSet] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      row: 10,
      column: 10,
      tile_size: 64,
      layers: [],
      solid_tile: [],
      tile_set: "",
      thumbnail: "",
    },
  });

  const handleTileSetUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setUploadingTileSet(true);
      const file = e.target.files[0];
      const result = await uploadImage(file, "tileset");
      if (result.status) {
        form.setValue("tile_set", result.data.id);
      }
      setUploadingTileSet(false);
    }
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.[0]) {
      setUploadingThumbnail(true);
      const file = e.target.files[0];
      const result = await uploadImage(file, "thumbnail");
      if (result.status) {
        form.setValue("thumbnail", result.data.id);
      }
      setUploadingThumbnail(false);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await createMap(data);
    if (result.status) {
      navigate("/map");
    }
  }

  return (
    <div className="flex h-full justify-center items-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create a New Map
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter map name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Row */}
            <FormField
              control={form.control}
              name="row"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rows</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Number of rows"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Column */}
            <FormField
              control={form.control}
              name="column"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Columns</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Number of columns"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tile Size */}
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Layers */}
            <FormField
              control={form.control}
              name="layers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Layers</FormLabel>
                  <FormControl>
                    <EditableJsonArray
                      label="Layers"
                      value={field.value}
                      onChange={(updatedValue) => field.onChange(updatedValue)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Solid Tiles */}
            <FormField
              control={form.control}
              name="solid_tile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solid Tiles</FormLabel>
                  <FormControl>
                    <EditableJsonArray
                      label="Solid Tiles"
                      value={field.value}
                      onChange={(updatedValue) => field.onChange(updatedValue)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tile Set */}
            <FormField
              control={form.control}
              name="tile_set"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tile Set</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={handleTileSetUpload}
                      disabled={uploadingTileSet}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </FormControl>
                  <FormMessage />
                  {uploadingTileSet && (
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

            {/* Thumbnail */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={handleThumbnailUpload}
                      disabled={uploadingThumbnail}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </FormControl>
                  <FormMessage />
                  {uploadingThumbnail && (
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

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Button type="submit" className="w-full md:w-auto px-8">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MapDetails;
