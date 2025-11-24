import React, { useState, useEffect } from 'react';
import { useProfile } from './ProfileContext'; // Import the context hook
import { styles } from './Styles';

const ProfileView = ({
  setActiveView,
  triggerProfilePhotoUpload,
  removeProfilePhoto
}) => {
  // Use the profile from context
  const { profile, updateProfile, loading } = useProfile();

  const [localProfile, setLocalProfile] = useState({
    phone: "",
    address: "",
    city: "",
    pincode: "",
    dateOfBirth: "",
    age: "",
    gender: ""
  });

  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);

  // Sync with updated profile from context - FIXED
  useEffect(() => {
    console.log('ProfileView: profile updated from context', profile);
    
    // Format date from backend (YYYY-MM-DD) to input format if needed
    let dateOfBirth = profile.dateOfBirth || "";
    if (dateOfBirth && dateOfBirth.includes('T')) {
      // If date includes time, extract just the date part
      dateOfBirth = dateOfBirth.split('T')[0];
    }
    
    setLocalProfile({
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      pincode: profile.pincode || "",
      dateOfBirth: dateOfBirth,
      age: profile.age || "",
      gender: profile.gender || ""
    });
  }, [profile]);

  // Auto-calculate age - FIXED
  useEffect(() => {
    if (localProfile.dateOfBirth) {
      const calculateAge = (birthDate) => {
        try {
          let dob;
          // Handle different date formats
          if (birthDate.includes('-')) {
            const parts = birthDate.split('-');
            if (parts.length === 3) {
              // Check if it's DD-MM-YYYY format
              if (parts[0].length <= 2 && parts[2].length === 4) {
                // DD-MM-YYYY format, convert to YYYY-MM-DD
                dob = new Date(`${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`);
              } else {
                // YYYY-MM-DD format
                dob = new Date(birthDate);
              }
            } else {
              dob = new Date(birthDate);
            }
          } else {
            dob = new Date(birthDate);
          }
          
          // Check if date is valid
          if (isNaN(dob.getTime())) {
            console.error('Invalid date:', birthDate);
            return '';
          }
          
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
          }
          
          // Return age as string, or empty if invalid
          return age >= 0 ? age.toString() : '';
        } catch (error) {
          console.error('Error calculating age:', error);
          return '';
        }
      };

      const calculatedAge = calculateAge(localProfile.dateOfBirth);
      console.log('Auto-calculated age:', calculatedAge, 'from date:', localProfile.dateOfBirth);
      if (calculatedAge) {
        setLocalProfile(prev => ({ 
          ...prev, 
          age: calculatedAge 
        }));
      }
    } else {
      // Clear age if no date of birth
      setLocalProfile(prev => ({ 
        ...prev, 
        age: '' 
      }));
    }
  }, [localProfile.dateOfBirth]);

  // Validate Form
  const validateLocalForm = () => {
    const errors = {};

    // Phone validation - make it required
    const phoneValue = localProfile.phone ? localProfile.phone.toString().trim() : '';
    if (!phoneValue) {
      errors.phone = "Phone number required";
    } else {
      // Remove any non-digit characters for validation
      const phoneDigits = phoneValue.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        errors.phone = "Enter valid 10-digit mobile number";
      } else if (!/^[6-9]/.test(phoneDigits)) {
        errors.phone = "Mobile number must start with 6-9";
      }
    }

    const addressValue = localProfile.address ? localProfile.address.trim() : '';
    if (!addressValue) {
      errors.address = "Address required";
    }

    const cityValue = localProfile.city ? localProfile.city.trim() : '';
    if (!cityValue) {
      errors.city = "City required";
    } else if (!/^[A-Za-z\s]+$/.test(cityValue)) {
      errors.city = "Only letters allowed";
    }

    const pincodeValue = localProfile.pincode ? localProfile.pincode.toString().trim() : '';
    if (!pincodeValue) {
      errors.pincode = "Pincode required";
    } else if (!/^\d{6}$/.test(pincodeValue)) {
      errors.pincode = "Must be 6 digits";
    }

    if (!localProfile.dateOfBirth) {
      errors.dateOfBirth = "Birthdate required";
    }

    if (!localProfile.age) {
      errors.age = "Age required";
    }

    // Gender validation - check for empty string, null, undefined, or the default option text
    const genderValue = localProfile.gender;
    if (!genderValue || genderValue === '' || genderValue === 'Select Gender' || genderValue.trim() === '') {
      errors.gender = "Gender required";
    }

    setLocalFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    setLocalIsFormValid(isValid);
    console.log('Form validation:', { 
      errors, 
      isValid, 
      localProfile, 
      gender: localProfile.gender,
      genderType: typeof localProfile.gender,
      genderEmpty: !localProfile.gender || localProfile.gender === '' || localProfile.gender === 'Select Gender'
    });
  };

  useEffect(() => {
    validateLocalForm();
  }, [localProfile.phone, localProfile.address, localProfile.city, localProfile.pincode, localProfile.dateOfBirth, localProfile.age, localProfile.gender]);

  const handleLocalProfileChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "city") updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    if (name === "pincode") updatedValue = value.replace(/\D/g, "").slice(0, 6);
    
    console.log('Field changed:', name, 'value:', updatedValue, 'type:', typeof updatedValue);

    setLocalProfile(prev => {
      const updated = { ...prev, [name]: updatedValue };
      console.log('Updated localProfile:', updated);
      // Validation will be triggered by useEffect watching the fields
      return updated;
    });
    setLocalIsFormTouched(true);
  };

  const handleLocalProfileBlur = (e) => {
    if (e.target.name === "phone") {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
      setLocalProfile(prev => ({ ...prev, phone: cleaned }));
    }
  };

  const handleLocalProfileUpdate = async (e) => {
    e.preventDefault();
    
    // Final validation check
    validateLocalForm();
    
    // Wait a bit for state to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Re-validate after state update
    const errors = {};
    const phoneValue = localProfile.phone ? localProfile.phone.toString().trim() : '';
    if (!phoneValue) {
      errors.phone = "Phone number required";
    } else {
      const phoneDigits = phoneValue.replace(/\D/g, '');
      if (phoneDigits.length !== 10 || !/^[6-9]/.test(phoneDigits)) {
        errors.phone = "Enter valid 10-digit mobile starting with 6-9";
      }
    }
    
    const addressValue = localProfile.address ? localProfile.address.trim() : '';
    if (!addressValue) {
      errors.address = "Address required";
    }
    
    const cityValue = localProfile.city ? localProfile.city.trim() : '';
    if (!cityValue) {
      errors.city = "City required";
    } else if (!/^[A-Za-z\s]+$/.test(cityValue)) {
      errors.city = "Only letters allowed";
    }
    
    const pincodeValue = localProfile.pincode ? localProfile.pincode.toString().trim() : '';
    if (!pincodeValue) {
      errors.pincode = "Pincode required";
    } else if (!/^\d{6}$/.test(pincodeValue)) {
      errors.pincode = "Must be 6 digits";
    }
    
    if (!localProfile.dateOfBirth) {
      errors.dateOfBirth = "Birthdate required";
    }
    
    if (!localProfile.age) {
      errors.age = "Age required";
    }
    
    if (!localProfile.gender || localProfile.gender === '') {
      errors.gender = "Gender required";
    }
    
    if (Object.keys(errors).length > 0) {
      setLocalFormErrors(errors);
      setLocalIsFormValid(false);
      console.log('Validation errors:', errors);
      alert("Please fix all errors before updating! Errors: " + Object.values(errors).join(', '));
      return;
    }

    // Format date to YYYY-MM-DD if needed (date input already provides YYYY-MM-DD)
    let formattedDate = localProfile.dateOfBirth;
    if (formattedDate) {
      // If date includes time, extract just the date part
      if (formattedDate.includes('T')) {
        formattedDate = formattedDate.split('T')[0];
      }
      // If date is in DD/MM/YYYY or DD-MM-YYYY format, convert to YYYY-MM-DD
      else if (formattedDate.includes('/') || (formattedDate.includes('-') && formattedDate.split('-')[0].length <= 2)) {
        const parts = formattedDate.split(/[\/\-]/);
        if (parts.length === 3) {
          // Check if it's DD-MM-YYYY format (first part is day)
          if (parts[0].length <= 2 && parts[2].length === 4) {
            formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
          }
        }
      }
    }

    // Clean phone number (remove any non-digits)
    const cleanPhone = localProfile.phone ? localProfile.phone.toString().replace(/\D/g, '') : '';

    // Create complete updated profile
    const updatedProfile = {
      ...profile, // Use the current profile from context
      phone: cleanPhone,
      address: localProfile.address ? localProfile.address.trim() : '',
      city: localProfile.city ? localProfile.city.trim() : '',
      pincode: localProfile.pincode ? localProfile.pincode.toString().trim() : '',
      dateOfBirth: formattedDate,
      age: localProfile.age ? localProfile.age.toString() : '',
      gender: localProfile.gender || ''
    };

    console.log('Updating profile with:', updatedProfile);
    console.log('User ID:', updatedProfile.id);

    try {
      // Update profile using the context function (which will save to backend)
      await updateProfile(updatedProfile);
      
      // Show success message
      alert("Profile updated successfully!");
      console.log('Profile update successful!');
      
      // Reset form touched state
      setLocalIsFormTouched(false);
      
      // Optional: Navigate back to dashboard
      // setActiveView("dashboard");
      
    } catch (error) {
      console.error("Profile update error:", error);
      const errorMessage = error.message || "Error updating profile. Please try again.";
      alert(errorMessage);
      // Re-throw to let the context handle it
      throw error;
    }
  };

  const BackButton = ({ onClick, text = "Back" }) => (
    <button style={styles.backButton} onClick={onClick} type="button">
      ← {text}
    </button>
  );

  return (
    <div style={styles.profileContainer}>
      <div style={styles.pageHeader}>
        <BackButton onClick={() => setActiveView("dashboard")} text="" />
        <h2 style={styles.sectionTitle}>My Profile</h2>
      </div>

     {/* Profile Photo */}
<div style={styles.profilePhotoSection}>
  <div style={styles.profilePhotoContainer}>
    <div style={styles.profilePhotoPreview}>
      <img
        src={localProfile.profilePhoto || profile.profilePhoto || ""}
        alt="Profile"
        style={styles.profilePhotoImage}
        onError={(e) => (e.target.style.display = "none")}
      />
      {!localProfile.profilePhoto && !profile.profilePhoto && (
        <div style={styles.profilePhotoPlaceholder}>
          {profile.fullName?.charAt(0).toUpperCase() || "U"}
        </div>
      )}
    </div>

    <div style={styles.profilePhotoActions}>
      {/* Upload Button + Hidden File Input */}
      <label style={styles.uploadPhotoButton}>
         Update Photo
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setLocalProfile((prev) => ({
                ...prev,
                profilePhoto: imageURL,
              }));
              updateProfile({
                ...profile,
                profilePhoto: imageURL,
              });
            }
          }}
        />
      </label>

      {/* Remove Button */}
      {(localProfile.profilePhoto || profile.profilePhoto) && (
        <button
          style={styles.removePhotoButton}
          type="button"
          onClick={() => {
            setLocalProfile((prev) => ({
              ...prev,
              profilePhoto: "",
            }));
            updateProfile({
              ...profile,
              profilePhoto: "",
            });
          }}
        >
           Remove Photo
        </button>
      )}
    </div>
  </div>
</div>


      {/* Form */}
      <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
        <div style={styles.formGrid}>
          
          {/* Full Name */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name</label>
            <input 
              type="text" 
              value={profile.fullName} 
              style={{ ...styles.formInput, ...styles.nonEditableField }} 
              disabled 
            />
            <p style={styles.fieldNote}>Name cannot be changed</p>
          </div>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input 
              type="email" 
              value={profile.email} 
              style={{ ...styles.formInput, ...styles.nonEditableField }} 
              disabled 
            />
            <p style={styles.fieldNote}>Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <div style={styles.phoneInputContainer}>
              <div style={styles.phonePrefix}>🇮🇳 +91</div>
              <input
                type="tel"
                name="phone"
                value={localProfile.phone}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.phoneInput,
                  ...(localIsFormTouched && localFormErrors.phone && styles.formInputError)
                }}
                placeholder="10-digit number"
                maxLength="10"
              />
            </div>
            {localIsFormTouched && localFormErrors.phone && (
              <span style={styles.formError}>{localFormErrors.phone}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Date of Birth *</label>
            <input 
              type="date" 
              name="dateOfBirth" 
              value={localProfile.dateOfBirth} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.dateOfBirth && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.dateOfBirth && (
              <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
            )}
          </div>

          {/* Age - Auto-calculated */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Age *</label>
            <input 
              type="text" 
              name="age" 
              value={localProfile.age} 
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.age && styles.formInputError) 
              }}
              placeholder="Auto-calculated from birth date"
              readOnly
            />
            {localIsFormTouched && localFormErrors.age && (
              <span style={styles.formError}>{localFormErrors.age}</span>
            )}
          </div>

          {/* Gender */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Gender *</label>
            <select 
              name="gender" 
              value={localProfile.gender} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.gender && styles.formInputError) 
              }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {localIsFormTouched && localFormErrors.gender && (
              <span style={styles.formError}>{localFormErrors.gender}</span>
            )}
          </div>

          {/* Address */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address *</label>
            <textarea 
              name="address" 
              rows="3" 
              placeholder="Full address"
              value={localProfile.address} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formTextarea, 
                ...(localIsFormTouched && localFormErrors.address && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.address && (
              <span style={styles.formError}>{localFormErrors.address}</span>
            )}
          </div>

          {/* City */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City *</label>
            <input 
              type="text" 
              name="city" 
              placeholder="Enter city name"
              value={localProfile.city} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.city && styles.formInputError) 
              }}
            />
            {localIsFormTouched && localFormErrors.city && (
              <span style={styles.formError}>{localFormErrors.city}</span>
            )}
          </div>

          {/* Pincode */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Pincode *</label>
            <input 
              type="text" 
              name="pincode" 
              placeholder="6 digits only"
              value={localProfile.pincode} 
              onChange={handleLocalProfileChange}
              style={{ 
                ...styles.formInput, 
                ...(localIsFormTouched && localFormErrors.pincode && styles.formInputError) 
              }}
              maxLength="6"
            />
            {localIsFormTouched && localFormErrors.pincode && (
              <span style={styles.formError}>{localFormErrors.pincode}</span>
            )}
          </div>
        </div>

        {/* Update Profile Button */}
        <button 
          type="submit" 
          style={{ 
            ...styles.updateButton, 
            ...(!localIsFormValid && styles.updateButtonDisabled) 
          }}
          disabled={!localIsFormValid || loading}
          onClick={(e) => {
            console.log('Update Profile button clicked!', { 
              localIsFormValid, 
              loading, 
              localProfile,
              errors: localFormErrors,
              gender: localProfile.gender
            });
            if (!localIsFormValid) {
              console.log('Form is not valid, preventing submit');
              e.preventDefault();
              const errorMessages = Object.values(localFormErrors).filter(msg => msg);
              if (errorMessages.length > 0) {
                alert('Please fix all errors: ' + errorMessages.join(', '));
              }
            }
          }}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileView;