import { useState } from 'react';
import { Upload, CheckCircle, XCircle, FileJson, ChevronDown } from 'lucide-react';

export default function Upload() {
    const [file, setFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [fileType, setFileType] = useState('common');
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const fileTypes = [
        { value: 'common', label: 'Common', description: 'General purpose JSON files' },
        { value: 'main', label: 'Main', description: 'Main configuration files' },
        { value: 'schema', label: 'Schema', description: 'Schema definition files' }
    ];

    const sampleJson = {
        users: [
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" }
        ],
        metadata: {
            version: "1.0",
            createdAt: "2025-11-02"
        }
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile({
                name: selectedFile.name,
                size: selectedFile.size
            });
            setJsonData(sampleJson);
            setUploadStatus(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        setFile({
            name: "sample-data.json",
            size: 2048
        });
        setJsonData(sampleJson);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleUpload = async () => {
        if (!file || !jsonData) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('jsonData', JSON.stringify(jsonData));

            const response = await fetch('/api/upload-json', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUploadStatus({
                    success: true,
                    message: `JSON uploaded successfully as ${fileTypes.find(t => t.value === fileType)?.label} type!`
                });
                // Clear form after successful upload
                setTimeout(() => {
                    setFile(null);
                    setJsonData(null);
                    setUploadStatus(null);
                }, 3000);
            } else {
                setUploadStatus({
                    success: false,
                    message: result.error || 'Upload failed',
                });
            }
        } catch (error) {
            setUploadStatus({
                success: false,
                message: 'Network error. Please try again.',
            });
        } finally {
            setUploading(false);
        }
    };
        setUploading(true);

    };

    const clearFile = () => {
        setFile(null);
        setJsonData(null);
        setUploadStatus(null);
    };

    const selectedFileType = fileTypes.find(t => t.value === fileType);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Upload JSON File
                        </h1>
                        <p className="text-gray-600">
                            Upload a single JSON file to store in the database
                        </p>
                    </div>

                    {/* File Type Dropdown */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            File Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                value={fileType}
                                onChange={(e) => setFileType(e.target.value)}
                                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-400 transition-colors"
                            >
                                {fileTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            {selectedFileType?.description}
                        </p>
                    </div>

                    {/* Upload Area */}
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                            isDragging
                                ? 'border-blue-500 bg-blue-50 scale-105'
                                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                        }`}
                    >
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer block">
                            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-700 mb-2">
                                Drop your JSON file here or click to browse
                            </p>
                            <p className="text-sm text-gray-500">
                                Supports .json files only
                            </p>
                        </label>
                    </div>

                    {/* File Preview */}
                    {file && jsonData && (
                        <div className="mt-6 border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center flex-1">
                                    <FileJson className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-gray-900">{file.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Type: <span className="font-medium text-blue-600">{selectedFileType?.label}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                            </div>

                            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-64 overflow-auto">
                <pre className="text-xs text-green-400 whitespace-pre-wrap font-mono">
                  {JSON.stringify(jsonData, null, 2)}
                </pre>
                            </div>

                            <button
                                onClick={clearFile}
                                className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                                Remove file
                            </button>
                        </div>
                    )}

                    {/* Upload Button */}
                    {file && jsonData && !showSuccess && (
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className={`mt-6 w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg ${
                                uploading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5'
                            }`}
                        >
                            {uploading ? (
                                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
                            ) : (
                                'Upload to Database'
                            )}
                        </button>
                    )}

                    {/* Status Messages */}
                    {uploadStatus && (
                        <div
                            className={`mt-6 p-5 rounded-xl flex items-center shadow-md animate-fadeIn ${
                                uploadStatus.success
                                    ? 'bg-green-50 text-green-800 border border-green-200'
                                    : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                        >
                            {uploadStatus.success ? (
                                <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                            ) : (
                                <XCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                            )}
                            <span className="font-medium">{uploadStatus.message}</span>
                        </div>
                    )}

                    {/* Demo Instructions */}
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>💡 Demo:</strong> Select a file type from the dropdown, then click the upload area or drag a file to see the preview.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
