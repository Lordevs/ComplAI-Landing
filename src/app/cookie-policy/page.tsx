'use client';

import DocxViewer from '@/components/DocxViewer';

export default function UserAgreementPage() {
  // const [agreed, setAgreed] = useState(false);

  // const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setAgreed(e.target.checked);
  // };

  // const handleContinue = () => {
  //   if (agreed) {
  //     // Redirect to dashboard or next step
  //     console.log('User agreed. Continue...');
  //   }
  // };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-24 px-4">
      <div className="w-full  ">
        <DocxViewer
          filePath="/docs/COOKIE POLICY.docx"
          heading="Cookie Policy"
          containerClassName="bg-gray-100 p-6 rounded-lg w-full"
          headingClassName="text-3xl font-semibold text-indigo-700 mb-6"
        />
      </div>

      {/* <div className="mt-8 w-full max-w-3xl flex flex-col items-center">
        <label className="flex items-start space-x-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={agreed}
            onChange={handleCheckboxChange}
            className="mt-1 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>I have read and agree to the User License & Agreement.</span>
        </label>

        <Button
          onClick={handleContinue}
          disabled={!agreed}
          className="mt-6 w-full max-w-xs"
        >
          Continue
        </Button>
      </div> */}
    </div>
  );
}
