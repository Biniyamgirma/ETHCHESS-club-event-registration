'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import profilePic from './profile.jpg'

function MemberRegistraion() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    rating: '',
    gender: '',
    age: '',
    address: '',
  })
  const [submitting, setSubmitting] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.')
        return
      }

      toast.success("Registered! We'll reach out — check your email for the ticket.")
      setForm({ fullName: '', phone: '', rating: '', gender: '', age: '', address: '' })
    } catch (err) {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative h-full max-w-screen space-y-6 bg-[#FFFCF1] px-14 py-4">
      <div className="flex items-center justify-center">
        <Image
          loading="eager"
          className="size-24 md:size-62 rounded-full object-cover"
          src={profilePic}
          alt="Profile Picture"
        />
      </div>

      <div>
        <h1 className="text-center text-3xl font-bold lg:text-4xl uppercase text-[#00A86B] font-space-grotesk">
          Player registration
        </h1>
      </div>
      <div>
        <p className="text-center text-sm">
          Join ETH CHESS — fill in your details below. Rating is optional if you&apos;re unrated.
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex items-center justify-center">
          <div className="space-y-6">
            <div className="justify-between space-y-4 md:flex">
              <div className="md:w-4/10">
                <div className="flex items-center justify-between">
                  <label htmlFor="fullName">Full name</label>
                  <svg height="16px" width="16px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <g>
                      <path
                        fill="#00A86B"
                        d="M159.131,169.721c5.635,58.338,43.367,96.867,96.871,96.867c53.502,0,91.23-38.53,96.867-96.867l7.988-63.029
                  C365.812,44.768,315.281,0,256.002,0c-59.281,0-109.812,44.768-104.86,106.692L159.131,169.721z"
                      />
                      <path
                        fill="#00A86B"
                        d="M463.213,422.569l-3.824-24.35c-3.203-20.417-16.035-38.042-34.475-47.361l-80.473-40.693
                  c-2.519-1.274-4.57-3.194-6.289-5.338c-23.297,24.632-51.6,39.12-82.15,39.12c-30.549,0-58.856-14.488-82.152-39.12
                  c-1.719,2.144-3.77,4.064-6.289,5.338l-80.472,40.693c-18.442,9.319-31.272,26.944-34.475,47.361l-3.826,24.35
                  c-1.363,8.692,0.436,21.448,8.222,27.825C67.42,458.907,105.875,512,256.002,512c150.125,0,188.578-53.093,198.988-61.606
                  C462.779,444.017,464.576,431.261,463.213,422.569z"
                      />
                    </g>
                  </svg>
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Abebe"
                  value={form.fullName}
                  onChange={handleChange}
                  className="m-0 w-full border-b border-gray-400 py-0 outline-0"
                />
              </div>
              <div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <label htmlFor="phone">Phone Number</label>
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    placeholder="0928XXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                    className="m-0 w-full border-b border-gray-400 py-0 outline-0"
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <label htmlFor="rating">Chess.com Rapid Rating</label>
                <svg width="16px" height="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#000000" d="M255 471L91.7 387V41h328.6v346zm-147.3-93.74L255 453l149.3-75.76V57H107.7zm146.56-33.1l-94.66-48.69v50l94.54 48.62 98.27-49.89v-49.9z" />
                </svg>
              </div>
              <input
                id="rating"
                name="rating"
                type="text"
                placeholder="2000"
                value={form.rating}
                onChange={handleChange}
                className="m-0 w-full border-b border-gray-400 py-0 outline-0"
              />
            </div>

            <div className="w-full max-w-xs">
              <label htmlFor="gender" className="mb-1 block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={form.gender}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-400 bg-white px-1 py-1 text-gray-900 shadow-sm focus:border-[#00A86B] focus:ring-[#00A86B] focus:outline-none sm:text-sm"
              >
                <option className="text-[#00A86B]" value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <label htmlFor="age">Age</label>
                <svg width="16px" height="16px" viewBox="0 0 48 48" id="b" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#00A86B" strokeLinecap="round" strokeLinejoin="round" d="m24.5,31.7v-15.4h5.1c2.9,0,5.2,2.3,5.2,5.2s-2.3,5.2-5.2,5.2h-5.1" />
                  <line stroke="#00A86B" strokeLinecap="round" strokeLinejoin="round" x1="29.5" y1="26.7" x2="34.6" y2="31.7" />
                  <path fill="none" stroke="#00A86B" strokeLinecap="round" strokeLinejoin="round" d="m21,23.3v4.5c0,2.1-1.7,3.9-3.9,3.9h0" />
                  <path fill="none" stroke="#00A86B" strokeLinecap="round" strokeLinejoin="round" d="m21,16.3v7.1c0,2.1-1.7,3.9-3.9,3.9h0c-2.1,0-3.9-1.7-3.9-3.9h0v-7.1" />
                  <circle fill="none" stroke="#00A86B" strokeLinecap="round" strokeLinejoin="round" cx="24" cy="24" r="21.5" />
                </svg>
              </div>
              <input
                id="age"
                name="age"
                type="number"
                required
                placeholder="18"
                value={form.age}
                onChange={handleChange}
                className="m-0 w-full border-b border-gray-400 py-0 outline-0"
              />
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <label htmlFor="address">Address</label>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Goro Adebabay"
                value={form.address}
                onChange={handleChange}
                className="m-0 w-full border-b border-gray-400 py-0 outline-0"
              />
            </div>

            <div className="flex w-full items-center justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center space-x-3 bg-[#00A86B] px-16 py-2 text-[#FFFCF1] hover:cursor-pointer hover:bg-[#00a86aba] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting...' : 'Register'}
                {!submitting && (
                  <div className="px-4">
                    <svg width="24px" height="24px" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <g id="icomoon-ignore"></g>
                      <path d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z" fill="#FFFCF1"></path>
                      <path d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z" fill="#FFFCF1"></path>
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberRegistraion