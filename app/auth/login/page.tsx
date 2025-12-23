'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLogin } from '@/lib/hooks';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const loginMutation = useLogin();
    const isRegistered = searchParams.get('registered') === 'true';

    useEffect(() => {
        if (isRegistered) {
            toast.success('Registrasi berhasil! Silakan login.');
        }
    }, [isRegistered]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email wajib diisi';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password wajib diisi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await loginMutation.mutateAsync(formData);
            toast.success('Login berhasil!');

            // Redirect to previous page or home
            const redirectTo = searchParams.get('redirect') || '/';
            router.push(redirectTo);
        } catch (error: any) {
            const message = error.response?.data?.message || 'Email atau password salah';
            setErrors({ submit: message });
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
                <div className="max-w-md mx-auto w-full">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-8"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Kembali ke Beranda
                    </Link>

                    <h1 className="text-3xl font-bold mb-2">Selamat Datang Kembali</h1>
                    <p className="text-gray-500 mb-8">
                        Masuk ke akun Anda untuk melanjutkan belanja
                    </p>

                    {isRegistered && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Registrasi berhasil! Silakan login.
                        </div>
                    )}

                    {errors.submit && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 px-4 py-3 rounded-lg mb-6">
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${errors.email
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 dark:border-gray-600 focus:ring-primary-500'
                                        } bg-transparent focus:ring-2 focus:border-transparent transition-all`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
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
                                    placeholder="Masukkan password"
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border ${errors.password
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 dark:border-gray-600 focus:ring-primary-500'
                                        } bg-transparent focus:ring-2 focus:border-transparent transition-all`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-primary-600 hover:text-primary-700"
                            >
                                Lupa Password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loginMutation.isPending ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Masuk'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">
                                atau masuk dengan
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                            </svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-gray-500">
                        Belum punya akun?{' '}
                        <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                            Daftar Sekarang
                        </Link>
                    </p>

                    {/* Demo Account Info */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">
                        <p className="font-medium text-blue-600 mb-2">Demo Account:</p>
                        <p className="text-blue-600/80">Email: buyer@suastore.id</p>
                        <p className="text-blue-600/80">Password: admin123</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 items-center justify-center p-12">
                <div className="max-w-lg text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">SuaStore</h2>
                    <p className="text-xl text-white/80 mb-8">
                        Belanja mudah, aman & terpercaya. Temukan jutaan produk dengan harga terbaik.
                    </p>
                    <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold">10K+</div>
                            <div className="text-white/70">Produk</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">50K+</div>
                            <div className="text-white/70">Pengguna</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">99%</div>
                            <div className="text-white/70">Kepuasan</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
