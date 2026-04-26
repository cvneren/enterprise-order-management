import { Key, Save, Bell, Shield, User, Building2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="py-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-on-surface tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-on-surface-variant font-sans">
          Configure system preferences and API keys.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation/Tabs */}
        <div className="space-y-1">
          {[
            { icon: User, label: "Profile", active: false },
            { icon: Building2, label: "Company Info", active: false },
            { icon: Bell, label: "Notifications", active: false },
            { icon: Key, label: "API Keys", active: true },
            { icon: Shield, label: "Security", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors font-sans ${
                item.active
                  ? "bg-primary-container/10 text-primary"
                  : "text-on-surface-variant hover:bg-background hover:text-on-surface"
              }`}
            >
              <item.icon
                className={`w-4 h-4 mr-3 ${item.active ? "text-primary" : "text-on-surface-variant"}`}
              />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-lg shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="font-heading text-xl font-semibold text-on-surface mb-1">
                API Authentication
              </h2>
              <p className="text-sm text-on-surface-variant font-sans">
                Manage your secret keys for REST API access.
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-2 font-sans">
                    Production Secret Key
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="password"
                      value="************************************"
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-md text-sm text-on-surface font-sans font-medium font-mono"
                    />
                    <button className="px-4 py-2.5 bg-surface-variant text-on-surface rounded-md text-sm font-medium hover:bg-border transition-colors font-sans">
                      Reveal
                    </button>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2 font-sans">
                    Never share your production key. Use the test key for development.
                  </p>
                </div>

                <div className="pt-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-2 font-sans">
                    Test Secret Key
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value="test_key_***************************"
                      readOnly
                      className="flex-1 px-4 py-2.5 bg-background border border-border rounded-md text-sm text-on-surface font-sans font-medium font-mono"
                    />
                    <button className="px-4 py-2.5 bg-surface-variant text-on-surface rounded-md text-sm font-medium hover:bg-border transition-colors font-sans">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F9F9F8] border-t border-border flex justify-end">
              <button className="flex items-center px-6 py-2.5 bg-primary text-on-primary rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm font-sans">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
