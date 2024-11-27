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
import { z } from "zod";

const formSchema = z.object({
  row: z.number().min(10).max(50),
  column: z.number().min(10).max(100),
  tile_size: z.number().min(10).max(100),
  layers: z.array(z.array(z.number().min(0))).min(1),
  solid_tile: z.array(z.number().min(0)),
  tile_set: z.string(),
  thumbnail: z.string(),
});

const MapDetails = () => {
  const [uploadingTileSet, setUploadingTileSet] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
        form.setValue("tile_set", result.data.name);
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
        form.setValue("thumbnail", result.data.name);
      }
      setUploadingThumbnail(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted values:", values);
  }

  return (
    <div className="flex flex-col">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 rounded-md border"
          >
            {/* Row, Column, and Tile Size */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="row"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Row</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="column"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Column</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tile_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tile Size</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Editable JSON for Layers */}
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

            {/* Editable JSON for Solid Tiles */}
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

            {/* Tile Set and Thumbnail */}
            <div className="flex gap-4">
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
                      />
                    </FormControl>
                    <FormMessage />
                    {uploadingTileSet && <p>Uploading...</p>}
                    {field.value && (
                      <p className="text-sm text-gray-600">
                        Uploaded: {field.value}
                      </p>
                    )}
                  </FormItem>
                )}
              />
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
                      />
                    </FormControl>
                    <FormMessage />
                    {uploadingThumbnail && <p>Uploading...</p>}
                    {field.value && (
                      <p className="text-sm text-gray-600">
                        Uploaded: {field.value}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MapDetails;
