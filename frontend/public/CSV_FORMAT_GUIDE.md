# ExoVision CSV Format Guide

## Backend Validation

The ExoVision frontend accepts any CSV file and uploads it to the backend. The backend server will handle all validation including:

- Required column validation
- Data type validation  
- Data format validation
- Error reporting

## Sample CSV Files

We provide sample CSV files with different column naming conventions:

### Sample 1: Generic Column Names
```csv
planet_name,orbital_period,transit_duration,planetary_radius,stellar_radius,stellar_mass,effective_temperature,metallicity,surface_gravity,classification
Kepler-452b,384.843,2.5,1.6,1.05,1.04,5757,0.04,4.32,Confirmed
TOI-715b,19.288,1.2,1.55,0.6,0.73,4325,0.0,4.7,Candidate
```

### Sample 2: NASA-Style Column Names
```csv
pl_name,pl_orbper,pl_trandur,pl_rade,st_rad,st_mass,st_teff,st_met,st_logg,disposition
Kepler-452b,384.843,2.5,1.6,1.05,1.04,5757,0.04,4.32,Confirmed
TOI-715b,19.288,1.2,1.55,0.6,0.73,4325,0.0,4.7,Candidate
```

## Upload Process

1. **Upload Any CSV**: The frontend accepts any CSV file
2. **Backend Validation**: Server validates columns and data format
3. **Error Display**: If validation fails, detailed error messages are shown
4. **Success**: If validation passes, file is processed

## Error Handling

- All validation errors are handled by the backend
- Detailed error messages are displayed in the frontend
- Users can fix their CSV and re-upload
- No client-side validation prevents upload attempts
