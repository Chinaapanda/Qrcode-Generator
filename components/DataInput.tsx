interface DataInputProps {
  data: string;
  onChange: (data: string) => void;
}

const DataInput = ({ data, onChange }: DataInputProps) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        📝 Data (Text/URL)
      </label>
      <div className="relative">
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white"
          rows={3}
          placeholder="Enter your text, URL, or any data..."
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {data.length} characters
        </div>
      </div>
    </div>
  );
};

export default DataInput;
