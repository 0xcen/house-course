import { useState, useEffect, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
// import { useMutation, gql } from "@apollo/client";
// import { useRouter } from "next/router";
import Link from "next/link";
// import { Image } from "cloudinary-react";
import { SearchBox } from "./searchBox";
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string;
  longitude: number;
  latitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

const HouseForm = ({}: IProps) => {
  const { errors, watch, register, setValue, handleSubmit } =
    useForm<IFormData>({
      defaultValues: {},
    });
  const [previewImage, setPreviewImage] = useState<string>();
  const [submitting, isSubmitting] = useState(false);
  const address = watch("address");

  useEffect(() => {
    register({ name: "address" }, { required: "Please provide your address." });
    register({ name: "longitude" }, { required: true, min: -90, max: 90 });
    register({ name: "latitude" }, { required: true, min: -180, max: 180 });
  }, [register]);

  const handleCreate = async (data: IFormData) => {
    //
  };

  const onSubmit = async (data: IFormData) => {
    isSubmitting(true);
    handleCreate(data);
  };

  return (
    <form className="mx-auto max-w-xl py-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl">Add a new house</h2>

      <div className="mt-4">
        <label htmlFor="search" className="block">
          Search for your address
        </label>
        {/* Search field */}
        <SearchBox
          onSelectAddress={(address, latitude, longitude) => {
            setValue("address", address);
            setValue("latitude", latitude);
            setValue("longitude", longitude);
          }}
          defaultValue=""
        />
        {errors.address && (
          <span className="block">{errors.address.message}</span>
        )}
      </div>
      {address && (
        <>
          <div className="mt-4">
            <label
              htmlFor="image"
              className="border-2 border-dotted block w-full p-4 cursor-pointer "
            >
              Click to add an image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target?.files?.[0]) {
                  const file = event.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview image"
              width={576}
              height={(19 / 9) * 576}
              className="mt-4 object-cover"
            />
          )}
          <div className="mt-4">
            <label htmlFor="bedrooms" className="block">
              Beds
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="p-2"
              ref={register({
                required: "Please enter the number of bedrooms",
                max: { value: 10, message: "Wooahh, too big of a house" },
                min: { value: 1, message: "Must have at least 1 bedroom" },
              })}
            />
            {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              type="submit"
              disabled={submitting}
            >
              Save
            </button>{" "}
            <Link href="/">
              <a>Cancel</a>
            </Link>
          </div>
        </>
      )}
    </form>
  );
};

export default HouseForm;
