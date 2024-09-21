import ProductImageUpload from "@/components/admin-view/Image_upload";
import CommonForm from "@/components/commen/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useState } from "react";
const initialFormData = {
  image: null,
  title: "",
  description: "",
  price: "",
  brand: "",
  salePrice: "",
  totalPrice: "",
};

const Products = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  function onSubmit() {}
  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog();
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            setImageFile={setImageFile}
            imageFile={imageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
              formControls={addProductFormElements}
            ></CommonForm>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default Products;
