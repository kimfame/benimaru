const HorizontalLine = () => {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <hr className="w-10/12 h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
      <span className="absolute px-3 text-sm text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
        OR
      </span>
    </div>
  )
}

export default HorizontalLine
