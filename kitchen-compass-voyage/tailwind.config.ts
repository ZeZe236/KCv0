import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				kitchen: {
					brown: '#5b2700',
					tan: '#D2B48C',
					cream: '#FFFDD0',
					orange: '#E86E43',
					light: '#F5F5DC',
					peach: '#FDE1D3',
					pink: '#FFDEE2',
					mint: '#F2FCE2',
					lavender: '#E5DEFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'expand-search': {
					from: {
						width: '60%',
					},
					to: {
						width: '80%',
					}
				},
				'rotate-wheel': {
					from: {
						transform: 'rotate(0deg)',
					},
					to: {
						transform: 'rotate(360deg)',
					}
				},
				'bounce-light': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					}
				},
				'wiggle': {
					'0%, 100%': {
						transform: 'rotate(-3deg)',
					},
					'50%': {
						transform: 'rotate(3deg)',
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)',
					},
					'50%': {
						transform: 'translateY(-10px)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'expand-search': 'expand-search 0.3s ease-out forwards',
				'rotate-wheel': 'rotate-wheel 20s linear infinite',
				'bounce-light': 'bounce-light 2s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'float': 'float 4s ease-in-out infinite',
			},
			backgroundImage: {
				'food-pattern': "url('/lovable-uploads/bfa0a09c-f44a-4fd7-9971-f700d945753b.png')",
			},
			fontFamily: {
				'pixel': ['VT323', 'monospace'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
