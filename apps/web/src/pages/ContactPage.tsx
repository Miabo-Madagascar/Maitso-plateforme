import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { MapPin, Phone, Mail, Send, CheckCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			setIsSubmitted(true);
			setFormData({ name: '', email: '', subject: '', message: '' });
		}, 1500);
	};

	return (
		<div className="pt-32 min-h-screen bg-gray-50 dark:bg-gray-900">
			<div className="bg-green-600 dark:bg-green-800">
				<div className="container mx-auto px-4 py-16">
					<div className="max-w-3xl">
						<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
							Contactez-nous
						</h1>
						<p className="text-green-100 md:text-lg">
							Vous avez des questions sur nos services ou souhaitez discuter d'un projet ?
							Notre équipe est là pour vous aider.
						</p>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<Card>
							<CardContent className="p-6">
								{!isSubmitted ? (
									<>
										<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
											Envoyez-nous un message
										</h2>

										<form onSubmit={handleSubmit}>
											<div className="grid grid-cols-1 gap-6">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
													<div>
														<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
															Nom complet
														</label>
														<input
															id="name"
															name="name"
															type="text"
															value={formData.name}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
														/>
													</div>

													<div>
														<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
															Adresse email
														</label>
														<input
															id="email"
															name="email"
															type="email"
															value={formData.email}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
														/>
													</div>
												</div>

												<div>
													<label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
														Sujet
													</label>
													<select
														id="subject"
														name="subject"
														value={formData.subject}
														onChange={handleChange}
														required
														className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
													>
														<option value="">Sélectionnez un sujet</option>
														<option value="Consultance RSE & IA">Consultance RSE & IA</option>
														<option value="Projets environnementaux">Projets environnementaux</option>
														<option value="Formations">Formations</option>
														<option value="Aménagement végétal">Aménagement végétal</option>
														<option value="Partenariat">Partenariat</option>
														<option value="Autre">Autre</option>
													</select>
												</div>

												<div>
													<label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
														Message
													</label>
													<textarea
														id="message"
														name="message"
														rows={5}
														value={formData.message}
														onChange={handleChange}
														required
														className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:text-white"
													/>
												</div>

												<div>
													<Button
														type="submit"
														className="w-full md:w-auto"
														size="lg"
														isLoading={isSubmitting}
													>
														<Send className="h-4 w-4 mr-2" />
														Envoyer le message
													</Button>
												</div>
											</div>
										</form>
									</>
								) : (
									<div className="flex flex-col items-center text-center py-6">
										<CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500 mb-4" />
										<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
											Message envoyé !
										</h2>
										<p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
											Merci de nous avoir contacté. Notre équipe vous répondra dans les plus brefs délais.
										</p>
										<Button
											onClick={() => setIsSubmitted(false)}
											variant="outline"
										>
											Envoyer un autre message
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					<div>
						<Card className="mb-6">
							<CardContent className="p-6">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
									Coordonnées
								</h3>

								<div className="space-y-4">
									<div className="flex items-start">
										<MapPin className="h-5 w-5 text-green-600 dark:text-green-500 mr-3 mt-0.5" />
										<div>
											<p className="text-gray-900 dark:text-white font-medium">Adresse</p>
											<p className="text-gray-600 dark:text-gray-400">
												Antananarivo, Madagascar
											</p>
										</div>
									</div>

									<div className="flex items-start">
										<Phone className="h-5 w-5 text-green-600 dark:text-green-500 mr-3 mt-0.5" />
										<div>
											<p className="text-gray-900 dark:text-white font-medium">Téléphone</p>
											<a href="tel:+261341234567" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
												+261340924165 <br /> +261325085872
											</a>
										</div>
									</div>

									<div className="flex items-start">
										<Mail className="h-5 w-5 text-green-600 dark:text-green-500 mr-3 mt-0.5" />
										<div>
											<p className="text-gray-900 dark:text-white font-medium">Email</p>
											<a href="mailto:maitso.madagascar@gmail.com " className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500">
												maitso.madagascar@gmail.com
											</a>
										</div>
									</div>
								</div>

								<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
										Suivez-nous
									</h3>

									<div className="flex space-x-4">
										<a
											href="https://www.instagram.com/maitso.madagascar/"
											target="_blank"
											rel="noopener noreferrer"
											className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-500 transition-colors"
										>
											<Instagram className="h-5 w-5" />
										</a>
										<a
											href="https://www.facebook.com/maitso.madagascar/"
											target="_blank"
											rel="noopener noreferrer"
											className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
										>
											<Facebook className="h-5 w-5" />
										</a>
										<a
											href="https://www.linkedin.com/company/maitso-madagascar/"
											target="_blank"
											rel="noopener noreferrer"
											className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors"
										>
											<Linkedin className="h-5 w-5" />
										</a>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
									Carte
								</h3>
								<div className="bg-gray-200 dark:bg-gray-800 h-48 rounded-md flex items-center justify-center">
									<p className="text-gray-500 dark:text-gray-400 text-center px-4">
										Carte interactive indisponible en mode démo
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
