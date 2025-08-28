"use client";

import React, { useState } from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { goldBlockDays } from "@/components/utils/common";
import { cn } from "@/lib/utils";

const GoldBlockScheduler = ({ value = [], onChange, disabled = false }) => {
  const [selectedDays, setSelectedDays] = useState(value || []);

  const handleDayToggle = (day) => {
    if (disabled) return;

    const newSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(newSelectedDays);
    onChange?.(newSelectedDays);
  };

  const isDaySelected = (day) => {
    return selectedDays.includes(day);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          Gold Block Availability
        </h4>
        <Chip size="sm" variant="flat" color="primary">
          {selectedDays.length} days selected
        </Chip>
      </div>

      <Card className="border border-gray-200">
        <CardBody className="p-4">
          <div className="mb-3">
            <h5 className="font-medium text-gray-800">
              Available Gold Block Days
            </h5>
            <p className="text-xs text-gray-500">
              Select which gold block days this tutor is available
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {goldBlockDays.map((day) => {
              const isSelected = isDaySelected(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDayToggle(day.value)}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all duration-200 text-center",
                    "hover:scale-105 active:scale-95",
                    isSelected
                      ? "bg-blue-50 border-blue-300 text-blue-800 font-medium shadow-md"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300",
                    disabled &&
                      "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100"
                  )}
                >
                  <div className="text-sm font-medium">{day.label}</div>
                  {isSelected && (
                    <div className="text-xs text-blue-600 mt-1">Available</div>
                  )}
                </button>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {selectedDays.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">
            Select which gold block days this tutor is available for tutoring
          </p>
        </div>
      )}

      {selectedDays.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected days:</strong>{" "}
            {selectedDays
              .map((day) => {
                const dayLabel = goldBlockDays.find(
                  (d) => d.value === day
                )?.label;
                return dayLabel;
              })
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default GoldBlockScheduler;
