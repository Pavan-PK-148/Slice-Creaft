import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  ChevronRight,
  ChevronLeft,
  ShoppingCart,
  Check,
  ArrowLeft,
  Layers,
  Loader,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { apiRequest } from "../utils/api";

const OPTIONS_DATA = {
  bases: [
    { id: "b1", name: "Classic Hand Tossed", price: 120 },
    { id: "b2", name: "Wheat Thin Crust", price: 140 },
    { id: "b3", name: "Cheese Burst", price: 190 },
    { id: "b4", name: "Fresh Pan Crust", price: 150 },
    { id: "b5", name: "Gluten-Free Crust", price: 180 },
  ],
  sauces: [
    { id: "s1", name: "Classic Marinara", price: 20 },
    { id: "s2", name: "Spicy Schezwan", price: 30 },
    { id: "s3", name: "Creamy White Alfredo", price: 40 },
    { id: "s4", name: "Smoky Barbecue", price: 35 },
    { id: "s5", name: "Zesty Garlic Parmesan", price: 40 },
  ],
  cheeses: [
    { id: "c1", name: "Classic Mozzarella", price: 60 },
    { id: "c2", name: "Sharp Cheddar", price: 75 },
    { id: "c3", name: "Gouda Blend", price: 90 },
    { id: "c4", name: "Artisanal Vegan Cheese", price: 110 },
  ],
  veggies: [
    { id: "v1", name: "Kalamata Olives", price: 25 },
    { id: "v2", name: "Fiery Jalapenos", price: 25 },
    { id: "v3", name: "Button Mushrooms", price: 30 },
    { id: "v4", name: "Red Onions", price: 15 },
    { id: "v5", name: "Crisp Bell Peppers", price: 20 },
    { id: "v6", name: "Sweet Corn", price: 20 },
  ],
  meats: [
    { id: "m1", name: "Pepperoni Slices", price: 80 },
    { id: "m2", name: "Smoked Chicken", price: 70 },
    { id: "m3", name: "Italian Sausage", price: 85 },
    { id: "m4", name: "Herbed Meatballs", price: 90 },
  ],
};

const STEPS = [
  { step: 1, title: "Choose Base", key: "base", dbKey: "bases", multi: false },
  { step: 2, title: "Select Sauce", key: "sauce", dbKey: "sauces", multi: false },
  { step: 3, title: "Cheese Layer", key: "cheese", dbKey: "cheeses", multi: false },
  { step: 4, title: "Garden Veggies", key: "veggies", dbKey: "veggies", multi: true },
  { step: 5, title: "Premium Meats", key: "meats", dbKey: "meats", multi: true },
];

export default function Products() {
  const { addToCart } = useCart();

  const [pizzaTemplates, setPizzaTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [currentStep, setCurrentStep] = useState(1);

  const [selections, setSelections] = useState({
    base: null,
    sauce: null,
    cheese: null,
    veggies: [],
    meats: [],
  });

  const assetBaseUrl = (
    import.meta.env.VITE_API_URL || "http://localhost:3000/api"
  ).replace("/api", "");

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await apiRequest("/admin/products", {
          method: "GET",
        });

        setPizzaTemplates(data);
      } catch (err) {
        toast.error("Database connection dropped.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const activeStepConfig = STEPS[currentStep - 1];
  const optionsList = OPTIONS_DATA[activeStepConfig?.dbKey] || [];

  const calculateTotal = () => {
    let price = selectedTemplate ? selectedTemplate.price : 0;

    if (selections.base) price += selections.base.price;
    if (selections.sauce) price += selections.sauce.price;
    if (selections.cheese) price += selections.cheese.price;

    selections.veggies.forEach((v) => (price += v.price));
    selections.meats.forEach((m) => (price += m.price));

    return price;
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);

    setSelections({
      base: OPTIONS_DATA.bases[0],
      sauce: OPTIONS_DATA.sauces[0],
      cheese: OPTIONS_DATA.cheeses[0],
      veggies: [],
      meats: [],
    });

    setCurrentStep(1);
  };

  const handleSelect = (item) => {
    const { key, multi } = activeStepConfig;

    if (!multi) {
      setSelections((prev) => ({
        ...prev,
        [key]: item,
      }));
    } else {
      setSelections((prev) => {
        const list = [...prev[key]];
        const index = list.findIndex((i) => i.id === item.id);

        if (index > -1) list.splice(index, 1);
        else list.push(item);

        return {
          ...prev,
          [key]: list,
        };
      });
    }
  };

  const isSelected = (item) => {
    const { key, multi } = activeStepConfig;

    if (!multi) return selections[key]?.id === item.id;

    return selections[key].some((i) => i.id === item.id);
  };

  const handleNext = () => {
    if (!activeStepConfig.multi && !selections[activeStepConfig.key]) {
      return toast.error(`Please select ${activeStepConfig.title}`);
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const completeCustomPizza = {
      id: `custom_${Date.now()}`,
      name: `SliceCraft ${selectedTemplate.name}`,
      price: calculateTotal(),
      totalPrice: calculateTotal(),

      details: {
        base: selections.base.name,
        sauce: selections.sauce.name,
        cheese: selections.cheese.name,
        veggies: selections.veggies.map((v) => v.name),
        meats: selections.meats.map((m) => m.name),
      },
    };

    addToCart(completeCustomPizza);

    toast.success("Pizza Added 🍕");

    setSelections({
      base: null,
      sauce: null,
      cheese: null,
      veggies: [],
      meats: [],
    });

    setSelectedTemplate(null);
    setCurrentStep(1);
  };

  // LOADER
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center relative overflow-hidden">

        <div className="absolute w-72 h-72 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

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
    );
  }

  // PRODUCT LIST
  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-[#fff8f3] py-16 px-6 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="mb-14 text-center">
            <h1 className="text-6xl font-black text-gray-900 mb-4">
              Choose Your Pizza
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Start with your favorite pizza and customize every layer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {pizzaTemplates.map((pizza) => (
              <motion.div
                key={pizza._id}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="group bg-white/70 backdrop-blur-xl rounded-[35px] overflow-hidden border border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-500"
              >

                <div
                  onClick={() => handleSelectTemplate(pizza)}
                  className="cursor-pointer"
                >

                  <div className="relative overflow-hidden h-72">

  <img
    src={
      pizza.image.startsWith("http")
        ? pizza.image
        : `${assetBaseUrl}/uploads/${pizza.image}` 
    }
    alt={pizza.name}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    onError={(e) => {
      e.target.src = "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600";
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

  <div className="absolute top-5 right-5 bg-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
    ₹{pizza.price}
  </div>

</div>

                  <div className="p-7">

                    <h2 className="text-3xl font-black text-gray-900 mb-3">
                      {pizza.name}
                    </h2>

                    <p className="text-gray-500 leading-relaxed">
                      {pizza.description}
                    </p>

                    <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all cursor-pointer">
                      Customize
                      <ChevronRight className="w-5 h-5" />
                    </button>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // CUSTOMIZATION PAGE
  return (
    <div className="min-h-screen bg-[#fff8f3] py-12 px-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-300/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">

          <button
            onClick={() => setSelectedTemplate(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="bg-white px-5 py-3 rounded-2xl shadow-md font-semibold">
            {selectedTemplate.name}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* MAIN */}
          <div className="lg:col-span-2">

            {/* STEPPER */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[30px] p-6 shadow-xl border border-orange-100 mb-8">

              <div className="flex justify-between gap-3 overflow-x-auto">

                {STEPS.map((step) => (
                  <div
                    key={step.step}
                    className="flex flex-col items-center min-w-[80px]"
                  >

                    <motion.div
                      animate={{
                        scale: currentStep === step.step ? 1.1 : 1,
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep >= step.step
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.step ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.step
                      )}
                    </motion.div>

                    <span className="text-sm mt-2 font-medium text-gray-700 text-center">
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* OPTIONS */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl border border-orange-100">

              <h2 className="text-4xl font-black text-gray-900 mb-2">
                {activeStepConfig.title}
              </h2>

              <p className="text-gray-500 mb-8">
                {activeStepConfig.multi
                  ? "Choose multiple options"
                  : "Choose one option"}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">

                {optionsList.map((item) => {
                  const checked = isSelected(item);

                  return (
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        y: -4,
                      }}
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`relative overflow-hidden p-5 rounded-3xl border text-left transition-all ${
                        checked
                          ? "border-orange-500 bg-orange-50 shadow-lg cursor-pointer"
                          : "border-gray-200 bg-white hover:border-orange-300 cursor-pointer"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {item.name}
                          </h3>

                          <p className="text-orange-500 font-semibold mt-1">
                            +₹{item.price}
                          </p>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            checked
                              ? "bg-orange-500 text-white"
                              : "border border-gray-300"
                          }`}
                        >
                          {checked && <Check className="w-4 h-4" />}
                        </div>
                      </div>

                    </motion.button>
                  );
                })}
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-10">

                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 transition-all disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft />
                </button>

                {currentStep < 5 ? (
                  <button
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    Continue
                    <ChevronRight />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingCart />
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="bg-white/70 backdrop-blur-xl rounded-[35px] p-8 border border-orange-100 shadow-2xl h-fit sticky top-8"
          >

            <div className="flex items-center gap-3 mb-8">

              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
                <Layers />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Order Summary
                </h2>

                <p className="text-sm text-gray-500">
                  Your Pizza Blueprint
                </p>
              </div>
            </div>

            <div className="space-y-6">

              <SummaryItem
                title="Base"
                value={selections.base?.name}
              />

              <SummaryItem
                title="Sauce"
                value={selections.sauce?.name}
              />

              <SummaryItem
                title="Cheese"
                value={selections.cheese?.name}
              />

              <SummaryItem
                title="Veggies"
                value={selections.veggies.map((v) => v.name).join(", ")}
              />

              <SummaryItem
                title="Meats"
                value={selections.meats.map((m) => m.name).join(", ")}
              />
            </div>

            <div className="border-t border-orange-100 mt-8 pt-6 flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Total
                </p>

                <h2 className="text-4xl font-black text-gray-900">
                  ₹{calculateTotal()}
                </h2>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ title, value }) {
  return (
    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">

      <p className="text-sm font-semibold text-orange-500 mb-1">
        {title}
      </p>

      <p className="text-gray-800 font-medium">
        {value || "Not Selected"}
      </p>

    </div>
  );
}
