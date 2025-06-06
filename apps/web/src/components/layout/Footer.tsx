import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-gray-50 dark:bg-gray-900 pt-12 pb-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div>
						<Link to="/" className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-4">
							<img src="/logo.png" alt="Logo" className="h-24" />
							{/* <Leaf className="h-6 w-6" />
							<span className="text-xl font-bold">MAITSO</span> */}
						</Link>
						<p className="text-gray-600 dark:text-gray-400 mb-4">
							Accompagnement des entreprises, collectivités et jeunes dans leur transition écologique grâce à l'IA, l'IoT et les énergies renouvelables.
						</p>
						<div className="flex space-x-4">
							<a
								href="https://www.instagram.com/maitso.madagascar/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
							>
								<Instagram className="h-5 w-5" />
							</a>
							<a
								href="https://www.facebook.com/maitso.madagascar/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
							>
								<Facebook className="h-5 w-5" />
							</a>
							<a
								href="https://www.linkedin.com/company/maitso-madagascar/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
							>
								<Linkedin className="h-5 w-5" />
							</a>
							<a
								href="mailto:maitso.madagascar@gmail.com "
								className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
							>
								<Mail className="h-5 w-5" />
							</a>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nos solutions</h3>
						<ul className="space-y-3">
							<li>
								<Link
									to="/solutions#consultance"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Consultance RSE IA
								</Link>
							</li>
							<li>
								<Link
									to="/solutions#projects"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Projets environnementaux
								</Link>
							</li>
							<li>
								<Link
									to="/solutions#formation"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Formations
								</Link>
							</li>
							<li>
								<Link
									to="/solutions#amenagement"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Aménagement végétal
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Liens utiles</h3>
						<ul className="space-y-3">
							<li>
								<Link
									to="/about"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									À propos
								</Link>
							</li>
							<li>
								<Link
									to="/blog"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Blog et sensibilisation
								</Link>
							</li>
							<li>
								<Link
									to="/partnerships"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Partenariats
								</Link>
							</li>
							<li>
								<Link
									to="/gallery"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Galerie photos
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
						<ul className="space-y-3">
							<li className="text-gray-600 dark:text-gray-400">
								Antananarivo, Madagascar
							</li>
							<li>
								<a
									href="mailto:maitso.madagascar@gmail.com "
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									maitso.madagascar@gmail.com
								</a>
							</li>
							<li>
								<a
									href="tel:+261341234567"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									+261340924165 <br /> +261325085872
								</a>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
								>
									Formulaire de contact
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<hr className="border-gray-200 dark:border-gray-800 my-8" />

				<div className="flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
						&copy; {new Date().getFullYear()} MAITSO Madagascar. Tous droits réservés.
					</p>
					<div className="flex space-x-4 text-sm">
						<Link
							to="/legal"
							className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
						>
							Mentions légales
						</Link>
						<Link
							to="/privacy"
							className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
						>
							Politique de confidentialité
						</Link>
						<a
							href="https://linktr.ee/maitso.madagascar"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
						>
							Linktree
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
