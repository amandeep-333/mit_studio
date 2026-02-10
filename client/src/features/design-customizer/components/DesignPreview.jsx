import React from "react";
import { Upload } from "lucide-react";
import { TSHIRT_COLORS } from "@/constants/designConfig.js";
const DesignPreview = ({
  uploadedDesign,
  designPosition,
  designSize,
  rotation,
  selectedColor,
  selectedProduct,
  printType,
  onMouseDown,
  onMouseMove,
  onMouseUp,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 sticky top-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Live Preview
      </h2>

      <div
        className="relative aspect-square max-w-2xl mx-auto overflow-hidden rounded-lg"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 500" className="w-full h-full">
            <defs>
              {printType === "aop" && uploadedDesign && (
                <pattern
                  id="aopPattern"
                  x={designPosition.x}
                  y={designPosition.y}
                  width={400 * (designSize / 100)}
                  height={500 * (designSize / 100)}
                  patternUnits="userSpaceOnUse"
                >
                  <image
                    href={uploadedDesign}
                    x="0"
                    y="0"
                    width={400 * (designSize / 100)}
                    height={500 * (designSize / 100)}
                    preserveAspectRatio="xMidYMid slice"
                    transform={`rotate(${rotation} ${200 * (designSize / 100)} ${250 * (designSize / 100)})`}
                  />
                </pattern>
              )}
            </defs>

            {/* T-shirt body */}
            <path
              d="M100 100 L80 120 L80 500 L320 500 L320 120 L300 100 L280 80 L270 70 L250 70 L240 80 L230 80 L220 90 L180 90 L170 80 L160 80 L150 70 L130 70 L120 80 Z"
              fill={
                printType === "aop"
                  ? "url(#aopPattern)"
                  : TSHIRT_COLORS.find((c) => c.value === selectedColor)?.hex ||
                    "#FFFFFF"
              }
              stroke="#E5E7EB"
              strokeWidth="2"
            />

            {/* Neckline */}
            <path
              d="M180 90 Q200 120 220 90"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />

            {/* Sleeve shadows for regular print */}
            {printType === "regular" && (
              <>
                <path d="M100 100 L80 120 L80 200" fill="rgba(0,0,0,0.05)" />
                <path d="M300 100 L320 120 L320 200" fill="rgba(0,0,0,0.05)" />
              </>
            )}
          </svg>
        </div>

        {/* Regular print design overlay */}
        {uploadedDesign && printType === "regular" && (
          <div
            className="absolute cursor-move"
            style={{
              left: `${designPosition.x}%`,
              top: `${designPosition.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              width: `${designSize}%`,
              maxWidth: "300px",
            }}
            onMouseDown={onMouseDown}
          >
            <img
              src={uploadedDesign}
              alt="Custom Design"
              className="w-full h-auto pointer-events-none select-none"
              draggable="false"
              style={{
                filter:
                  selectedColor === "black"
                    ? "brightness(1.2) contrast(1.1)"
                    : "none",
              }}
            />
          </div>
        )}

        {/* AOP pattern adjustment overlay */}
        {uploadedDesign && printType === "aop" && (
          <div
            className="absolute cursor-move border-2 border-dashed border-blue-500 bg-blue-500 bg-opacity-10"
            style={{
              left: `${designPosition.x}%`,
              top: `${designPosition.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              width: `${designSize}%`,
              height: `${designSize}%`,
              maxWidth: "400px",
              maxHeight: "500px",
              pointerEvents: "auto",
            }}
            onMouseDown={onMouseDown}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                Drag to adjust pattern origin
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!uploadedDesign && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">
                Upload a design to get started
              </p>
              <p className="text-sm mt-2">
                Your design will appear on the {selectedProduct}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Help text */}
      {uploadedDesign && (
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-medium">💡 Pro Tip:</p>
          {printType === "regular" ? (
            <p>
              Click and drag your design to reposition it on the{" "}
              {selectedProduct}
            </p>
          ) : (
            <p>
              Drag to adjust pattern origin and use size controls to scale.
              Pattern repeats across entire {selectedProduct}!
            </p>
          )}
        </div>
      )}

      {/* Print type badge */}
      <div className="mt-4 flex justify-center">
        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            printType === "aop"
              ? "bg-purple-100 text-purple-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {printType === "aop" ? "🎨 All Over Print" : "📍 Regular Print"}
        </span>
      </div>
    </div>
  );
};

export default DesignPreview;
