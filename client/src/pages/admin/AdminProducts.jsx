import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import AdminLayout from "../../components/AdminLayout";

import {
  Plus,
  Trash2,
  Upload,
  User,
  ShieldCheck,
  Mail,
  Package,
  ImageIcon,
  Loader2,
} from "lucide-react";

import { toast } from "react-hot-toast";

import { apiRequest } from "../../utils/api";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

export default function AdminProducts() {
  const fileInputRef = useRef(null);

  const [showForm, setShowForm] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(null);

  const [templates, setTemplates] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
  });

  const apiRootUrl =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api";

  const assetBaseUrl =
    apiRootUrl.replace("/api", "");

  const loadTemplates = async () => {
    try {
      const data = await apiRequest(
        "/admin/products",
        {
          method: "GET",
        }
      );

      setTemplates(data);
    } catch (err) {
      console.warn("Failed loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleFileSelection = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error(
          "Please upload image file."
        );
      }

      setSelectedFile(file);

      setImagePreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !selectedFile
    ) {
      return toast.error(
        "Please fill all fields."
      );
    }

    const serverPayload = new FormData();

    serverPayload.append(
      "name",
      formData.name
    );

    serverPayload.append(
      "price",
      Number(formData.price)
    );

    serverPayload.append(
      "description",
      formData.desc
    );

    serverPayload.append(
      "pizzaImage",
      selectedFile
    );

    const loadId = toast.loading(
      "Uploading template..."
    );

    try {
      const data = await apiRequest(
        "/admin/products",
        {
          method: "POST",
          body: serverPayload,
        }
      );

      setTemplates((prev) => [
        data.product,
        ...prev,
      ]);

      setFormData({
        name: "",
        price: "",
        desc: "",
      });

      setSelectedFile(null);

      setImagePreview(null);

      setShowForm(false);

      toast.success(
        "Template added successfully 🎉",
        {
          id: loadId,
        }
      );
    } catch (err) {
      toast.error(
        err.message || "Upload failed.",
        {
          id: loadId,
        }
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Delete this pizza template?"
      )
    )
      return;

    try {
      await apiRequest(
        `/admin/products/${id}`,
        {
          method: "DELETE",
        }
      );

      setTemplates((prev) =>
        prev.filter((t) => t._id !== id)
      );

      toast.success(
        "Template deleted."
      );
    } catch (err) {
      toast.error(
        err.message || "Delete failed."
      );
    }
  };

  // LOADING
  if (loading) {
    return (
      <AdminLayout
        title="Template Inventory"
        subtitle="Synchronizing product assets..."
      >

        <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">

          <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="w-24 h-24 rounded-full border-4 border-orange-200 border-t-orange-500"
          />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Template Inventory Engine"
      subtitle="Manage pizza templates and inventory assets."
    >

      <div className="relative overflow-hidden">

        {/* GLOWS */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8">

          {/* ADMIN PROFILE */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[35px] p-7 shadow-xl"
          >

            <div className="flex flex-col lg:flex-row items-center gap-6">

              {/* ICON */}
              <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-2xl shrink-0">

                <User className="w-12 h-12" />
              </div>

              {/* INFO */}
              <div className="flex-1 text-center lg:text-left">

                <div className="flex flex-col lg:flex-row items-center gap-3 mb-3">

                  <h2 className="text-3xl font-black text-gray-900">
                    Admin Control Center
                  </h2>

                  <div className="flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold">

                    <ShieldCheck className="w-4 h-4" />

                    Secure Access
                  </div>
                </div>

                <p className="text-gray-500 flex items-center justify-center lg:justify-start gap-2">

                  <Mail className="w-4 h-4" />

                  ops-control@slicecraft.com
                </p>
              </div>

              {/* SESSION */}
              <div className="bg-orange-50 border border-orange-100 px-5 py-4 rounded-2xl text-center">

                <p className="text-sm text-gray-500 font-medium">
                  SESSION
                </p>

                <h3 className="text-lg font-black text-orange-500">
                  SC-ROOT-992A
                </h3>
              </div>
            </div>
          </motion.div>

          {/* TOP BAR */}
          <div className="flex flex-col lg:flex-row justify-between gap-5 lg:items-center">

            <div>

              <h1 className="text-5xl font-black text-gray-900 mb-2">
                Product Templates
              </h1>

              <p className="text-gray-500 text-lg">
                {templates.length} templates available
              </p>
            </div>

<motion.button
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.97,
  }}
  onClick={() => setShowForm(!showForm)}
  className="group relative bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
>

  {/* HOVER GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl cursor-pointer" />

  {/* CONTENT */}
  <div className="relative z-10 flex items-center gap-3 cursor-pointer">

    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />

    <span>
      {showForm ? "Close Form" : "Add Template"}
    </span>
  </div>

</motion.button>

          </div>

          {/* FORM */}
          <AnimatePresence>

            {showForm && (
              <motion.form
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[40px] p-8 shadow-2xl space-y-7"
              >

                {/* HEADER */}
                <div className="flex items-center gap-4">

                  <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg">

                    <Package className="w-8 h-8" />
                  </div>

                  <div>

                    <h2 className="text-3xl font-black text-gray-900">
                      Add Pizza Template
                    </h2>

                    <p className="text-gray-500">
                      Upload new product blueprint
                    </p>
                  </div>
                </div>

                {/* INPUTS */}
                <div className="grid md:grid-cols-2 gap-6">

                  <InputField
                    label="Pizza Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Fire BBQ Pizza"
                  />

                  <InputField
                    type="number"
                    label="Base Price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        price: e.target.value,
                      }))
                    }
                    placeholder="499"
                  />
                </div>

                {/* DESCRIPTION */}
                <div>

                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Description
                  </label>

                  <textarea
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        desc: e.target.value,
                      }))
                    }
                    placeholder="Describe pizza template..."
                    className="w-full bg-white/70 border border-orange-100 rounded-3xl py-5 px-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm resize-none h-32"
                  />
                </div>

                {/* IMAGE UPLOAD */}
                <div>

                  <label className="block text-sm font-bold text-gray-700 mb-4">
                    Upload Pizza Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={
                      handleFileSelection
                    }
                    className="hidden"
                  />

                  <motion.div
                    whileHover={{
                      scale: 1.01,
                    }}
                    onClick={() =>
                      fileInputRef.current.click()
                    }
                    className="group border-2 border-dashed border-orange-200 hover:border-orange-400 rounded-[35px] p-10 bg-orange-50/50 cursor-pointer transition-all flex flex-col items-center justify-center gap-5"
                  >

                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded-3xl shadow-xl"
                      />
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-3xl bg-orange-500 text-white flex items-center justify-center shadow-xl">

                          <ImageIcon className="w-10 h-10" />
                        </div>

                        <div className="text-center">

                          <p className="text-xl font-black text-gray-900 mb-2">
                            Upload Product Image
                          </p>

                          <p className="text-gray-500">
                            Click here to browse
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  type="submit"
                  className="group relative overflow-hidden w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-bold shadow-2xl transition-all cursor-pointer"
                >

                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">

                    <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />

                    Commit Template
                  </span>

                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

{/* PRODUCTS GRID */}
<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

  {templates.map((pizza, index) => (
    <motion.div
      key={pizza._id}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      whileHover={{
        y: -6,
      }}
      className="group bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden h-52">

        <img
          src={
            pizza.image?.startsWith("http")
              ? pizza.image
              : `${assetBaseUrl}${pizza.image}`
          }
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* PRICE TAG */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg text-sm">
          ₹{pizza.price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-grow">

        {/* TITLE */}
        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2 line-clamp-2">
          {pizza.name}
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 leading-relaxed text-sm line-clamp-3 flex-grow">
          {pizza.description ||
            "No description available."}
        </p>

        {/* FOOTER */}
        <div className="flex items-center justify-between mt-5">

          {/* PRICE */}
          <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
            Base ₹{pizza.price}
          </div>

          {/* DELETE BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.08,
              rotate: 5,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() =>
              handleDelete(pizza._id)
            }
            className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-md cursor-pointer"
          >

            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  ))}
</div>


          {/* EMPTY */}
          {templates.length === 0 && (
            <div className="bg-white/70 backdrop-blur-xl border border-orange-100 rounded-[35px] p-16 text-center shadow-xl">

              <Loader2 className="w-16 h-16 text-orange-500 mx-auto mb-5 animate-spin" />

              <h2 className="text-3xl font-black text-gray-900 mb-3">
                No Templates Found
              </h2>

              <p className="text-gray-500 text-lg">
                Add your first pizza template
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

/* INPUT FIELD */
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="block text-sm font-bold text-gray-700 mb-3">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/70 border border-orange-100 rounded-2xl py-4 px-5 focus:outline-none focus:border-orange-500 transition-all text-gray-800 font-medium shadow-sm"
      />
    </div>
  );
}
