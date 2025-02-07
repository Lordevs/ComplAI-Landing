import { Check } from 'lucide-react';

import { Card } from '@/components/ui/card';

export function PricingTable() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Find Your Compliance Plan
        </h2>
        <p className="text-gray-600">
          Flexible, scalable, and tailored solutions to keep your firm compliant
          and confident.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Column Headers */}
        <div className="space-y-8">
          <div className="h-32">
            {' '}
            {/* Spacer to align with other columns */}
          </div>
          <div className="font-medium">Core</div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>Minimum Commitment</div>
            <div>User License</div>
            <div>Accessibility</div>
            <div>Key Benefit</div>
          </div>
          <div className="font-medium mt-8">Features</div>
          <div className="space-y-4 text-sm text-gray-600">
            <div>Interactive Demo Assistance</div>
            <div>Create & Manage Documents</div>
            <div>Account & Data Security</div>
            <div>Step-By-Step Guidance</div>
            <div>Automated Policy Review</div>
            <div>Document upload</div>
            <div>File Review & Analysis</div>
            <div>Voice Assistance</div>
            <div>Upload Custom Compliance Manual</div>
          </div>
        </div>

        {/* Pay As You Use */}
        <Card className="p-6 rounded-lg border border-gray-200">
          <div className="h-32">
            <div className="text-sm font-medium text-blue-600">
              Pay As You Use
            </div>
            <div className="text-sm text-blue-600">Top-up Anytime</div>
            <p className="text-sm text-gray-600 mt-2">
              Firms seeking immediate compliance support with flexible,
              long-term commitments
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white rounded-md py-2 text-sm">
              Try for Free
            </button>
            <div className="text-xs text-gray-500 mt-1 text-center">
              w/ top-up now
            </div>
          </div>
          <div className="space-y-8">
            <div></div>
            <div className="space-y-4 text-sm">
              <div>No Contract</div>
              <div>Single User</div>
              <div>Desktop Only</div>
              <div>Flexibility</div>
            </div>
            <div className="space-y-4 mt-8">
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
            </div>
          </div>
        </Card>

        {/* Professional */}
        <Card className="p-6 rounded-lg border-2 border-blue-600 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
              Most Popular
            </span>
          </div>
          <div className="h-32">
            <div className="text-sm font-medium">Professional</div>
            <div className="text-lg font-medium">
              £49 <span className="text-sm text-gray-600">/ month</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Firms willing to stay ahead of compliance requirements and
              maintain quality consultations
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white rounded-md py-2 text-sm">
              Get Professional
            </button>
          </div>
          <div className="space-y-8">
            <div></div>
            <div className="space-y-4 text-sm">
              <div>12 Months</div>
              <div>Single User</div>
              <div>Desktop Only</div>
              <div>Comprehensive Support</div>
            </div>
            <div className="space-y-4 mt-8">
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>Up to 5MB</div>
              <div>-</div>
              <div>-</div>
              <div>-</div>
            </div>
          </div>
        </Card>

        {/* Enterprise */}
        <Card className="p-6 rounded-lg border border-gray-200">
          <div className="h-32">
            <div className="text-sm font-medium text-blue-600">Enterprise</div>
            <div className="text-sm text-blue-600">Custom Quote</div>
            <p className="text-sm text-gray-600 mt-2">
              Firms managing high-risk, regulated activities or multiple
              entities, or secure litigation
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white rounded-md py-2 text-sm">
              Contact Sales
            </button>
          </div>
          <div className="space-y-8">
            <div></div>
            <div className="space-y-4 text-sm">
              <div>24 Months</div>
              <div>Multiple Users</div>
              <div>Desktop & Mobile</div>
              <div>Scalable Solutions</div>
            </div>
            <div className="space-y-4 mt-8">
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>Up to 50 MB</div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <Check className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Mobile functionality on Pay As You Use and Professional plans is limited
        but still usable, with full optimization exclusive to Enterprise
      </div>
    </div>
  );
}
