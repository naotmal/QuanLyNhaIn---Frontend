import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import MaterialForm from "../../components/material/materialForm/MaterialForm";
import {
  getMaterial,
  getMaterials,
  selectIsLoading,
  selectMaterial,
  updateMaterial,
} from "../../redux/features/material/materialSlice";

const EditMaterial = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const materialEdit = useSelector(selectMaterial);

  const [material, setMaterial] = useState(materialEdit);
  const [materialImage, setMaterialImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getMaterial(id));
  }, [dispatch, id]);

  useEffect(() => {
    setMaterial(materialEdit);

    setImagePreview(
      materialEdit && materialEdit.image ? `${materialEdit.image.filePath}` : null
    );

    setDescription(
      materialEdit && materialEdit.description ? materialEdit.description : ""
    );
  }, [materialEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleImageChange = (e) => {
    setMaterialImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveMaterial = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", material?.name);

    formData.append("category", material?.category);
    formData.append("quantity", material?.quantity);
    formData.append("price", material?.price);
    formData.append("description", description);
    if (materialImage) {
      formData.append("image", materialImage);
    }

    console.log(...formData);

    await dispatch(updateMaterial({ id, formData }));
    await dispatch(getMaterials());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Material</h3>
      <MaterialForm
        material={material}
        materialImage={materialImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveMaterial={saveMaterial}
      />
    </div>
  );
};

export default EditMaterial;