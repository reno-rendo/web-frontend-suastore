'use client';

import { useState } from 'react';
import {
    Settings,
    Globe,
    CreditCard,
    Bell,
    Shield,
    Palette,
    Save
} from 'lucide-react';

const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
];

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors ${activeTab === tab.id
                                ? 'bg-primary-500 text-white'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg">General Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Site Name</label>
                            <input type="text" defaultValue="SuaStore" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Site URL</label>
                            <input type="text" defaultValue="https://suastore.com" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Contact Email</label>
                            <input type="email" defaultValue="support@suastore.com" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Default Currency</label>
                            <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <option>IDR - Indonesian Rupiah</option>
                                <option>USD - US Dollar</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Site Description</label>
                        <textarea rows={3} defaultValue="SuaStore - Your trusted e-commerce marketplace" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg resize-none" />
                    </div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg"><Save className="w-4 h-4" />Save Changes</button>
                    </div>
                </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg">Payment Settings</h2>

                    <div className="space-y-4">
                        <h3 className="font-medium">Payment Gateways</h3>

                        <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-medium">Xendit</p>
                                    <p className="text-sm text-gray-500">Virtual Account, E-Wallet, QRIS</p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Secret Key</label>
                                    <input type="password" defaultValue="xnd_development_xxx" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Callback Token</label>
                                    <input type="password" defaultValue="callback_xxx" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg"><Save className="w-4 h-4" />Save Changes</button>
                    </div>
                </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg">Notification Settings</h2>

                    <div className="space-y-4">
                        {[
                            { label: 'New User Registration', desc: 'Get notified when new users register' },
                            { label: 'New Order', desc: 'Get notified for new orders' },
                            { label: 'Low Stock Alert', desc: 'Alert when product stock is low' },
                            { label: 'New Store Application', desc: 'When sellers apply to open store' },
                            { label: 'Product Review', desc: 'New product reviews' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                                <div>
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-5 h-5" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg"><Save className="w-4 h-4" />Save Changes</button>
                    </div>
                </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
                    <h2 className="font-bold text-lg">Security Settings</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                            <input type="number" defaultValue="60" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Max Login Attempts</label>
                            <input type="number" defaultValue="5" className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                            <div>
                                <p className="font-medium">Force 2FA for Admins</p>
                                <p className="text-sm text-gray-500">Require two-factor authentication</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                            <div>
                                <p className="font-medium">IP Whitelist</p>
                                <p className="text-sm text-gray-500">Restrict admin access to specific IPs</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg"><Save className="w-4 h-4" />Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}
