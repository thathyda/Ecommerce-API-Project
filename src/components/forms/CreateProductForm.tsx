"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Image from "next/image";
import axios from "axios";
import { BASE_API_URL } from "@/constants/baseApi";

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
  categoryName: Yup.string().required("Category name is required"),
  categoryImage: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const CreateProductForm = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0NzUxNDYyLCJpYXQiOjE3MTI1OTE0NjIsImp0aSI6ImRkOWU0NTUyZWI2ZDRjODBiYjU5YThkMDQ3NjM4YzAyIiwidXNlcl9pZCI6MjZ9.njPrzIxI-CR_8KpSlRwjBfNFcPzhck0rCtqWh-R70Q4"
  );
  myHeaders.append(
    "Cookie",
    "csrftoken=nGSE1UjMNA4oKbIAd00u3o8N4PyPDThYwrITgDuXsntVdSJhZ4PGtD0KVDIHVSsS; sessionid=2wahcy9e16hp8czdl7ditx5unhrqtore"
  );

  const handleSubmitToServer = async (values: any) => {
    try {
      const response = await axios.post(`${BASE_API_URL}file/product/`, values);
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData.image);
      const categoryIconUrl = await handleSubmitToServer(values.categoryImage);

      console.log("data: ", values);
      const postData = await fetch(`${BASE_API_URL}products/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
          category: {
            name: values.categoryName,
            icon: categoryIconUrl,
          },
        }),
      });

      console.log("post data: ", postData);

      if (postData.status === 201) {
        window.alert("Product created successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full pt-9">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          const formData = new FormData();
          formData.append("image", values.image);
          handleCreateProduct(values, { image: formData });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          category: {
            name: "",
            icon: undefined,
          },
          name: "",
          desc: "",
          image: undefined,
          price: 0,
          quantity: 0,
          categoryName: "",
          categoryImage: undefined,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder="T-shirt"
                className={fieldStyle}
                name="name"
                type="text"
              />
            </div>
            {/* Category Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="categoryName">Category Name: </label>
              <Field
                placeholder="Enter category name"
                className={fieldStyle}
                name="categoryName"
                type="text"
              />
              <ErrorMessage
                name="categoryName"
                component="div"
                className="text-red-600"
              />
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder="This is a t-shirt"
                className={fieldStyle}
                name="desc"
                type="text"
              />
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder="100"
                className={fieldStyle}
                name="price"
                type="number"
              />
            </div>
            {/* quantity */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder="1"
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              {/* Image */}
              <div>
                <label htmlFor="image">Product Image: </label>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue}
                  component={CustomInput}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-600"
                />
              </div>
              {/* Category Image */}
              <div className="flex flex-col gap-2">
                <label htmlFor="categoryImage">Category Icon: </label>
                <Field
                  name="categoryImage"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue}
                  component={CustomInput}
                />
                <ErrorMessage
                  name="categoryImage"
                  component="div"
                  className="text-red-600"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
              >
                Create Product
              </button>
            </div>
          </Form>

)}
</Formik>
</div>
);
};
export default CreateProductForm;

// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
const [previewImage, setPreviewImage] = useState<string | undefined>(
undefined
);
const name = field.name;
const onChange: any = (event: any) => {
const file = event.currentTarget.files[0];
setFieldValue(name, file);
setPreviewImage(URL.createObjectURL(file));
};

return (
<div className="flex flex-col gap-4 justify-center">
<input
  type="file"
  onChange={onChange}
  {...props}
  className="border border-gray-300 rounded-md"
/>
{previewImage && (
  <Image
    className="rounded-md"
    src={previewImage}
    alt="preview Image"
    width={100}
    height={100}
  />
)}
</div>
);
}
