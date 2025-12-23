'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Check } from 'lucide-react';
import { useRegister } from '@/lib/hooks';
import { toast } from 'sonner';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const registerMutation = useRegister();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nama lengkap wajib diisi';
        }

        if (!formData.email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (formData.phone && !/^(\+62|62|0)8[1-9][0-9]{6,10}$/.test(formData.phone)) {
            newErrors.phone = 'Format nomor HP tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password minimal 8 karakter';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak sama';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await registerMutation.mutateAsync({
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phone: formData.phone || undefined,
            });

            toast.success('Registrasi berhasil!');
            router.push('/auth/login?registered=true');
        } catch (error: any) {
            const message = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
            setErrors({ submit: message });
            toast.error(message);
        }
    };

    const passwordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*]/.test(password)) strength++;

        const labels = ['', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
        const colors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];

        return { strength, label: labels[strength], color: colors[strength] };
    };

    const { strength, label, color } = passwordStrength();

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-accent-600 via-accent-500 to-primary-500 items-center justify-center p-12">
                <div className="max-w-lg text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Bergabung dengan SuaStore</h2>
                    <p className="text-xl text-white/80 mb-8">
                        Daftar sekarang dan nikmati berbagai keuntungan belanja online
                    </p>
                    <div className="space-y-4 text-left max-w-sm mx-auto">
                        {[
                            'Gratis ongkir untuk pembelian pertama',
                            'Voucher diskon hingga 50%',
                            'Poin reward setiap transaksi',
                            'Customer service 24/7',
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                    <Check className="w-4 h-4" />
                                </div>
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 overflow-y-auto">
                <div className="max-w-md mx-auto w-full">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali ke Beranda
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Buat Akun Baru</h1>
                    <p className="text-gray-500 mb-8">
                        Isi data berikut untuk membuat akun
                    </p>

                    {errors.submit && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Masukkan nama lengkap"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="nama@email.com"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Nomor HP (Opsional)</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="08xxxxxxxxxx"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Minimal 8 karakter"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full ${i <= strength ? color : 'bg-gray-200 dark:bg-gray-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500">Kekuatan password: {label}</span>
                                </div>
                            )}
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Konfirmasi Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Ulangi password"
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                                        } bg-transparent focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Saya menyetujui{' '}
                                    <Link href="/terms" className="text-primary-600 hover:underline">
                                        Syarat & Ketentuan
                                    </Link>{' '}
                                    dan{' '}
                                    <Link href="/privacy" className="text-primary-600 hover:underline">
                                        Kebijakan Privasi
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {registerMutation.isPending ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Daftar Sekarang'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-8 text-gray-500">
                        Sudah punya akun?{' '}
                        <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
