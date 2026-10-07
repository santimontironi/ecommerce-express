const Loader = ({ className = "min-h-[60vh]" }) => {
  return (
    <div className={`grid w-full place-items-center ${className}`}>
      <span role="status" aria-label="Cargando" className="size-9 animate-spin rounded-full border-2 border-current border-t-transparent opacity-50" />
    </div>
  )
}

export default Loader
