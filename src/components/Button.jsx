const base =
  'inline-flex min-h-11 items-center justify-center rounded px-6 py-3 text-center text-base font-semibold transition-transform duration-150 ease-out-strong active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none motion-reduce:active:transform-none disabled:cursor-not-allowed disabled:bg-sand-strong disabled:text-ink disabled:active:scale-100'

const variants = {
  primary: 'bg-accent text-white can-hover:hover:bg-accent-strong',
  dark: 'bg-ink text-paper can-hover:hover:bg-accent',
  light: 'bg-paper text-ink can-hover:hover:bg-sand',
}

// Enlace con aspecto de botón si recibe href; botón nativo en otro caso.
export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href && !props.disabled) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
