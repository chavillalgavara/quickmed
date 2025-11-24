// src/context/ProfileContext.js
import React, { useState, useContext, createContext, useEffect } from 'react';
import { profileAPI } from '../../services/api';

const ProfileContext = createContext();

export const ProfileProvider = ({ children, user }) => {
  // Initialize with user data from login (immediate display)
  const initializeProfile = () => {
    if (!user) {
      return {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        profilePhoto: null,
        userType: 'user',
        id: null
      };
    }
    
    // Normalize user data (handle both snake_case and camelCase from backend)
    const normalizedUser = {
      id: user.id || null,
      fullName: user.fullName || user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      pincode: user.pincode || '',
      dateOfBirth: user.dateOfBirth || user.date_of_birth || '',
      age: user.age || '',
      gender: user.gender || '',
      profilePhoto: user.profilePhoto || null,
      userType: user.userType || user.user_type || 'user',
      // User-type specific fields from login
      ...(user.userType === 'vendor' || user.user_type === 'vendor') && {
        businessName: user.businessName || user.business_name || '',
        licenseNumber: user.licenseNumber || user.license_number || '',
        gstNumber: user.gstNumber || user.gst_number || ''
      },
      ...(user.userType === 'delivery' || user.user_type === 'delivery') && {
        vehicleNumber: user.vehicleNumber || user.vehicle_number || '',
        licenseNumber: user.licenseNumber || user.license_number || '',
        isAvailable: user.isAvailable !== undefined ? user.isAvailable : (user.is_available !== undefined ? user.is_available : true)
      },
      ...(user.userType === 'doctor' || user.user_type === 'doctor') && {
        specialization: user.specialization || '',
        qualification: user.qualification || '',
        licenseNumber: user.licenseNumber || user.license_number || '',
        experienceYears: user.experienceYears || user.experience_years || 0,
        consultationFee: user.consultationFee || user.consultation_fee || 0,
        bio: user.bio || ''
      }
    };
    
    return normalizedUser;
  };
  
  const [profile, setProfile] = useState(initializeProfile);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update profile when user prop changes (from login)
  useEffect(() => {
    if (user) {
      const normalizedProfile = {
        id: user.id || null,
        fullName: user.fullName || user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        pincode: user.pincode || '',
        dateOfBirth: user.dateOfBirth || user.date_of_birth || '',
        age: user.age || '',
        gender: user.gender || '',
        profilePhoto: user.profilePhoto || null,
        userType: user.userType || user.user_type || 'user',
        // User-type specific fields from login
        ...(user.userType === 'vendor' || user.user_type === 'vendor') && {
          businessName: user.businessName || user.business_name || '',
          licenseNumber: user.licenseNumber || user.license_number || '',
          gstNumber: user.gstNumber || user.gst_number || ''
        },
        ...(user.userType === 'delivery' || user.user_type === 'delivery') && {
          vehicleNumber: user.vehicleNumber || user.vehicle_number || '',
          licenseNumber: user.licenseNumber || user.license_number || '',
          isAvailable: user.isAvailable !== undefined ? user.isAvailable : (user.is_available !== undefined ? user.is_available : true)
        },
        ...(user.userType === 'doctor' || user.user_type === 'doctor') && {
          specialization: user.specialization || '',
          qualification: user.qualification || '',
          licenseNumber: user.licenseNumber || user.license_number || '',
          experienceYears: user.experienceYears || user.experience_years || 0,
          consultationFee: user.consultationFee || user.consultation_fee || 0,
          bio: user.bio || ''
        }
      };
      setProfile(normalizedProfile);
    }
  }, [user]);

  // Fetch full profile from backend when user is available
  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch if we have user ID and user type
      const userId = user?.id;
      const userType = user?.userType || user?.user_type;
      
      if (userId && userType) {
        setLoading(true);
        setError(null);
        try {
          const profileData = await profileAPI.get(userId, userType);
          
          // Format the data for frontend
          const formattedProfile = {
            id: profileData.id,
            fullName: profileData.fullName || profileData.full_name || profile.fullName,
            email: profileData.email || profile.email,
            phone: profileData.phone || profile.phone,
            userType: profileData.userType || profileData.user_type || userType,
            address: profileData.address || profile.address || '',
            city: profileData.city || profile.city || '',
            pincode: profileData.pincode || profile.pincode || '',
            dateOfBirth: profileData.dateOfBirth || profileData.date_of_birth || profile.dateOfBirth || '',
            age: profileData.age || profile.age || '',
            gender: profileData.gender || profile.gender || '',
            profilePhoto: profileData.profilePhoto || profile.profilePhoto || null,
            // Include user-type specific fields
            ...(userType === 'vendor' && {
              businessName: profileData.business_name || profileData.businessName || profile.businessName || '',
              licenseNumber: profileData.license_number || profileData.licenseNumber || profile.licenseNumber || '',
              gstNumber: profileData.gst_number || profileData.gstNumber || profile.gstNumber || ''
            }),
            ...(userType === 'delivery' && {
              vehicleNumber: profileData.vehicle_number || profileData.vehicleNumber || profile.vehicleNumber || '',
              licenseNumber: profileData.license_number || profileData.licenseNumber || profile.licenseNumber || '',
              isAvailable: profileData.is_available !== undefined ? profileData.is_available : (profile.isAvailable !== undefined ? profile.isAvailable : true)
            }),
            ...(userType === 'doctor' && {
              specialization: profileData.specialization || profile.specialization || '',
              qualification: profileData.qualification || profile.qualification || '',
              licenseNumber: profileData.license_number || profileData.licenseNumber || profile.licenseNumber || '',
              experienceYears: profileData.experience_years || profileData.experienceYears || profile.experienceYears || 0,
              consultationFee: profileData.consultation_fee || profileData.consultationFee || profile.consultationFee || 0,
              bio: profileData.bio || profile.bio || ''
            })
          };
          
          setProfile(formattedProfile);
        } catch (err) {
          console.error('Error fetching profile from backend:', err);
          setError(err.message);
          // Keep login data if backend fetch fails - profile already has login data
        } finally {
          setLoading(false);
        }
      }
    };

    // Only fetch if we have both ID and userType
    if (user?.id && (user?.userType || user?.user_type)) {
      fetchProfile();
    }
  }, [user?.id, user?.userType, user?.user_type]);

  const updateProfile = async (newProfile) => {
    console.log('Updating profile in context:', newProfile);
    console.log('Profile ID:', newProfile.id || profile.id);
    
    // Update local state immediately for better UX
    setProfile(prevProfile => ({
      ...prevProfile,
      ...newProfile
    }));
    
    // Also update in backend if we have user ID
    const userId = newProfile.id || profile.id;
    if (!userId) {
      console.error('No user ID found for profile update');
      throw new Error('User ID is required to update profile');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Format date to YYYY-MM-DD format if needed
      let dateOfBirth = newProfile.dateOfBirth || profile.dateOfBirth;
      if (dateOfBirth) {
        // If date is in DD-MM-YYYY or DD/MM/YYYY format, convert to YYYY-MM-DD
        if (dateOfBirth.includes('/') || dateOfBirth.includes('-')) {
          const parts = dateOfBirth.split(/[\/\-]/);
          if (parts.length === 3) {
            // Check if it's DD-MM-YYYY format
            if (parts[0].length <= 2 && parts[2].length === 4) {
              dateOfBirth = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
            // If already YYYY-MM-DD, keep as is
          }
        }
      }
      
      // Clean phone number (remove any non-digits, ensure it's a string)
      const cleanPhone = (newProfile.phone || profile.phone || '').toString().replace(/\D/g, '');
      
      const updateData = {
        user_id: userId,
        user_type: newProfile.userType || profile.userType || 'user',
        phone: cleanPhone,
      };
      
      // Add optional fields only if they have values
      if (newProfile.address !== undefined && newProfile.address !== null && newProfile.address !== '') {
        updateData.address = newProfile.address.toString().trim();
      }
      if (newProfile.city !== undefined && newProfile.city !== null && newProfile.city !== '') {
        updateData.city = newProfile.city.toString().trim();
      }
      if (newProfile.pincode !== undefined && newProfile.pincode !== null && newProfile.pincode !== '') {
        updateData.pincode = newProfile.pincode.toString().trim();
      }
      if (dateOfBirth && dateOfBirth !== '') {
        updateData.date_of_birth = dateOfBirth;
      }
      if (newProfile.gender !== undefined && newProfile.gender !== null && newProfile.gender !== '') {
        updateData.gender = newProfile.gender;
      }
      
      // User-type specific fields
      if (newProfile.userType === 'vendor' || profile.userType === 'vendor') {
        if (newProfile.businessName !== undefined) {
          updateData.business_name = newProfile.businessName;
        }
        if (newProfile.licenseNumber !== undefined) {
          updateData.license_number = newProfile.licenseNumber;
        }
        if (newProfile.gstNumber !== undefined) {
          updateData.gst_number = newProfile.gstNumber;
        }
      }
      
      if (newProfile.userType === 'delivery' || profile.userType === 'delivery') {
        if (newProfile.vehicleNumber !== undefined) {
          updateData.vehicle_number = newProfile.vehicleNumber;
        }
        if (newProfile.licenseNumber !== undefined) {
          updateData.license_number = newProfile.licenseNumber;
        }
        if (newProfile.isAvailable !== undefined) {
          updateData.is_available = newProfile.isAvailable;
        }
      }
      
      if (newProfile.userType === 'doctor' || profile.userType === 'doctor') {
        if (newProfile.specialization !== undefined) {
          updateData.specialization = newProfile.specialization;
        }
        if (newProfile.qualification !== undefined) {
          updateData.qualification = newProfile.qualification;
        }
        if (newProfile.licenseNumber !== undefined) {
          updateData.license_number = newProfile.licenseNumber;
        }
        if (newProfile.experienceYears !== undefined) {
          updateData.experience_years = newProfile.experienceYears;
        }
        if (newProfile.consultationFee !== undefined) {
          updateData.consultation_fee = newProfile.consultationFee;
        }
        if (newProfile.bio !== undefined) {
          updateData.bio = newProfile.bio;
        }
      }
        
        console.log('Sending update data to backend:', updateData);
        const updatedProfile = await profileAPI.update(updateData);
        console.log('Backend response:', updatedProfile);
        
        // Update with backend response
        const formattedProfile = {
          id: updatedProfile.id,
          fullName: updatedProfile.fullName || updatedProfile.full_name || profile.fullName,
          email: updatedProfile.email || profile.email,
          phone: updatedProfile.phone || profile.phone,
          userType: updatedProfile.userType || updatedProfile.user_type || profile.userType,
          address: updatedProfile.address || '',
          city: updatedProfile.city || '',
          pincode: updatedProfile.pincode || '',
          dateOfBirth: updatedProfile.dateOfBirth || updatedProfile.date_of_birth || '',
          age: newProfile.age || profile.age || '', // Keep the age from the update (calculated)
          gender: updatedProfile.gender || newProfile.gender || profile.gender || '',
          profilePhoto: profile.profilePhoto || null,
          ...updatedProfile
        };
        
        // Update local state with the formatted profile
        setProfile(formattedProfile);
        setError(null);
        console.log('Profile updated successfully in context');
      } catch (err) {
        console.error('Error updating profile in backend:', err);
        console.error('Error details:', err.message, err.stack);
        setError(err.message);
        // Re-throw the error so the calling component can handle it
        throw err;
      } finally {
        setLoading(false);
      }
  };

  const updateProfilePhoto = (photoUrl) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: photoUrl
    }));
  };

  const removeProfilePhoto = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      profilePhoto: null
    }));
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile,
      updateProfilePhoto,
      removeProfilePhoto,
      loading,
      error
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;