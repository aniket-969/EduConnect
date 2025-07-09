import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const BasicFields = () => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();
 
  console.log("basic err",errors)
  const {
    fields: objectiveFields,
    append: appendObjective,
    remove: removeObjective,
  } = useFieldArray({ control, name: "learningObjectives" });

  const thumbnailFile = watch("thumbnail");
  

  const onRemoveObjective = (idx) => {
    removeObjective(idx);
    const remaining = getValues("learningObjectives");
    if (remaining.length <= 1) {
      setTimeout(() => trigger("learningObjectives"), 10);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <Input
          placeholder="Enter course title"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
          data-error-key="title"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <Textarea
          placeholder="Write a short description"
          {...register("description")}
          className={errors.description ? "border-red-500" : ""}
          data-error-key="description"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <Input
          placeholder="Eg: Web Development"
          {...register("category")}
          className={errors.category ? "border-red-500" : ""}
          data-error-key="category"
        />
        {errors.category && (
          <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* Level */}
      <div>
        <label className="block font-semibold mb-1">Level</label>
        <div className="flex gap-4">
          {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((lvl) => {
      const displayLabel = lvl.charAt(0) + lvl.slice(1).toLowerCase();
      return (
        <label key={lvl} >
          <input type="radio" value={lvl} {...register("level")} /> {displayLabel}
        </label>
      );
    })}
        </div>
        {errors.level && (
          <p className="text-red-600 text-sm mt-1" data-error-key="level">
            {errors.level.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block font-semibold mb-1">Price (₹)</label>
        <Input
          type="number"
          min={0}
          placeholder="Eg: 499"
          {...register("price", { valueAsNumber: true })}
          className={errors.price ? "border-red-500" : ""}
          data-error-key="price"
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Learning Objectives */}
      <div>
        <label className="block font-semibold mb-1">Learning Objectives</label>
        {objectiveFields.map((obj, idx) => (
          <div key={obj.id} className="flex items-center gap-2 mb-2">
            <div className="w-full">
              <Input
                placeholder="Eg: Understand JSX"
                {...register(`learningObjectives.${idx}`)}
                className={errors.learningObjectives?.[idx] ? "border-red-500" : ""}
                data-error-key={`learningObjectives.${idx}`}
              />
              {errors.learningObjectives?.[idx] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.learningObjectives[idx]?.message}
                </p>
              )}
            </div>
            <Button
              type="button"
              size="icon"
              variant="none"
              onClick={() => onRemoveObjective(idx)}
              className="text-white hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => appendObjective("")}
        >
          Add Objective
        </Button>
        {(errors.learningObjectives?.message ?? errors.learningObjectives?.root?.message) && (
          <p className="text-red-600 text-sm mt-1" data-error-key="learningObjectives">
            {errors.learningObjectives.message || errors.learningObjectives.root.message}
          </p>
        )}
      </div>

      {/* Thumbnail */}
      <div data-error-key="thumbnail">
        <label className="block font-semibold mb-1">Thumbnail *</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setValue("thumbnail", e.target.files?.[0] || null)
            
          }
          className={`file:mr-4 ${errors.thumbnail ? "border-red-500" : ""}`}
          
        />
        {errors.thumbnail && (
          <p className="text-red-600 text-sm mt-1" data-error-key="thumbnail">{errors.thumbnail.message}</p>
        )}
        {thumbnailFile && thumbnailFile instanceof File && (
          <img
            src={URL.createObjectURL(thumbnailFile)}
            alt="Preview"
            className="mt-2 max-h-40 rounded"
          />
        )}
      </div>
    </div>
  );
};

export default BasicFields;
