import DesignUploader from "./DesignUploader";
import PrintTypeSelector from "./PrintTypeSelector";
import ProductSelector from "./ProductSelector";
import ColorSelector from "./ColorSelector";
import DesignControls from "./DesignControls";
import SavedDesigns from "./SavedDesigns";
import DesignPreview from "./DesignPreview";
import Notification from "../common/Notification";
import { useDesignCustomizer } from "../../hooks/useDesignCustomizer";
import { useFileUpload } from "../../hooks/useFileUpload";
import { useNotification } from "../../hooks/useNotification";
import { downloadDesignAsImage } from "../../utils/canvasUtils";
import { generateUserId } from "../../utils/generateUserId";
import { TSHIRT_COLORS } from "../../constants/designConfig";
import { useState } from "react";

function DesignCustomizer() {
  const [currentUserId] = useState(generateUserId());
  const { notification, showNotification } = useNotification();

  const { uploadedDesign, uploadedFileUrl, isUploading, handleFileUpload } =
    useFileUpload(
      (message) => showNotification(message, "success"),
      (message) => showNotification(message, "error"),
    );

  const {
    designPosition,
    designSize,
    rotation,
    selectedColor,
    selectedProduct,
    printType,
    isSaving,
    savedDesigns,
    setSelectedColor,
    setSelectedProduct,
    handlePrintTypeChange,
    handleSizeChange,
    handleRotation,
    resetDesign,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleSaveDesign,
  } = useDesignCustomizer(
    currentUserId,
    (message) => showNotification(message, "success"),
    (message) => showNotification(message, "error"),
  );

  const handleSaveToCart = () => {
    handleSaveDesign(uploadedFileUrl);
  };

  const handleDownload = () => {
    downloadDesignAsImage(
      uploadedDesign,
      designPosition,
      designSize,
      rotation,
      selectedColor,
      TSHIRT_COLORS,
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Notification notification={notification} />

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Custom Design Studio
            </h1>
            <div className="text-sm text-gray-600">House of Mit</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <DesignUploader
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
            />

            <PrintTypeSelector
              printType={printType}
              onPrintTypeChange={handlePrintTypeChange}
            />

            <ProductSelector
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
            />

            <ColorSelector
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              printType={printType}
            />

            <DesignControls
              designSize={designSize}
              onSizeChange={handleSizeChange}
              onRotation={handleRotation}
              onReset={resetDesign}
              onSave={handleSaveToCart}
              onDownload={handleDownload}
              isSaving={isSaving}
              printType={printType}
              selectedProduct={selectedProduct}
              hasDesign={!!uploadedDesign}
            />

            <SavedDesigns savedDesigns={savedDesigns} />
          </div>

          {/* Right Side - Preview */}
          <div className="lg:col-span-2">
            <DesignPreview
              uploadedDesign={uploadedDesign}
              designPosition={designPosition}
              designSize={designSize}
              rotation={rotation}
              selectedColor={selectedColor}
              selectedProduct={selectedProduct}
              printType={printType}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignCustomizer;
