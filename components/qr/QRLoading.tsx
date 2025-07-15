interface QRLoadingProps {
  size: number;
}

const QRLoading = ({ size }: QRLoadingProps) => (
  <div
    className="flex items-center justify-center bg-gray-100 rounded-lg"
    style={{ width: size, height: size }}
  >
    <div className="text-center text-gray-500">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
      <p className="text-sm">Processing pixels...</p>
    </div>
  </div>
);

export default QRLoading;
