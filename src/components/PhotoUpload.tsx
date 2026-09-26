import { ImagePlus, X } from 'lucide-react'
import { forwardRef, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { site } from '../config/site'

export interface UploadedPhoto {
  id: string
  file: File
}

interface Props {
  photos: UploadedPhoto[]
  onChange: (photos: UploadedPhoto[]) => void
  disabled?: boolean
}

const { maxFiles, maxSizeMb, acceptedTypes, acceptedLabel } = site.enquiry.photos

function describe(file: File) {
  const mb = file.size / (1024 * 1024)
  return `${file.name} (${mb < 0.1 ? '<0.1' : mb.toFixed(1)} MB)`
}

/**
 * Optional multi-image upload with previews, per-file removal and honest
 * validation messages. Forwarded ref points at the hidden file input so the
 * "Send Us Your Photos" button can hand focus to it.
 */
const PhotoUpload = forwardRef<HTMLInputElement, Props>(function PhotoUpload({ photos, onChange, disabled }, ref) {
  const [problems, setProblems] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const idRef = useRef(0)

  const previews = useMemo(
    () => photos.map((p) => ({ id: p.id, url: URL.createObjectURL(p.file), name: p.file.name })),
    [photos],
  )
  useEffect(() => () => previews.forEach((p) => URL.revokeObjectURL(p.url)), [previews])

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list)
    const next = [...photos]
    const issues: string[] = []
    for (const file of incoming) {
      if (!acceptedTypes.includes(file.type)) {
        issues.push(`${file.name} was skipped. Only ${acceptedLabel} images can be added.`)
        continue
      }
      if (file.size > maxSizeMb * 1024 * 1024) {
        issues.push(`${describe(file)} is over the ${maxSizeMb} MB limit and was skipped.`)
        continue
      }
      if (next.some((p) => p.file.name === file.name && p.file.size === file.size)) {
        issues.push(`${file.name} is already added.`)
        continue
      }
      if (next.length >= maxFiles) {
        issues.push(`You can add up to ${maxFiles} photos. ${file.name} was not added.`)
        continue
      }
      next.push({ id: `photo-${idRef.current++}`, file })
    }
    setProblems(issues)
    onChange(next)
  }

  function remove(id: string) {
    setProblems([])
    onChange(photos.filter((p) => p.id !== id))
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const inputId = 'enquiry-photos'
  const hintId = `${inputId}-hint`
  const problemsId = `${inputId}-problems`
  const full = photos.length >= maxFiles

  return (
    <div>
      <span className="field-label" id={`${inputId}-label`}>
        Add photos <span className="font-normal text-muted">(optional)</span>
      </span>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`rounded-xl border-2 border-dashed px-4 py-4 text-center transition-colors motion-reduce:transition-none ${
          dragging ? 'border-leaf bg-leaf-pale' : 'border-line bg-sage/60'
        }`}
      >
        <input
          ref={ref}
          id={inputId}
          name="photos"
          type="file"
          accept={acceptedTypes.join(',')}
          multiple
          disabled={disabled || full}
          aria-labelledby={`${inputId}-label`}
          aria-describedby={`${hintId}${problems.length ? ` ${problemsId}` : ''}`}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <label
          htmlFor={inputId}
          className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 font-semibold text-forest ${
            disabled || full ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-leaf-pale'
          }`}
        >
          <ImagePlus className="size-5" aria-hidden="true" />
          {full ? `Maximum of ${maxFiles} photos added` : photos.length ? 'Add more photos' : 'Choose photos or drop them here'}
        </label>
        <p id={hintId} className="mt-1 text-sm text-muted">
          {acceptedLabel}, up to {maxSizeMb} MB each, maximum {maxFiles} photos.
        </p>
      </div>

      {problems.length > 0 && (
        <ul id={problemsId} role="alert" className="mt-2 space-y-1 text-sm font-medium text-red-700">
          {problems.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}

      {previews.length > 0 && (
        <ul className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-4" aria-label="Photos added">
          {previews.map((p) => (
            <li key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-line bg-white">
              <img src={p.url} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => remove(p.id)}
                disabled={disabled}
                className="absolute right-1 top-1 inline-flex size-10 items-center justify-center rounded-full bg-white/95 text-forest-deep shadow hover:bg-red-50 hover:text-red-700"
              >
                <span className="sr-only">Remove {p.name}</span>
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

export default PhotoUpload
