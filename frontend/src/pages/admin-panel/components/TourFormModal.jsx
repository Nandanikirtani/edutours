import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { tourService } from '../../../services/tourService';

const TourFormModal = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    duration: '',
    description: '',
    educationalFocus: '',
    studentLevel: 'school',
    tourType: 'cultural-heritage',
    status: 'draft',
    isFeatured: false,
    isNew: false,
    groupDiscountEnabled: true,
    availability: 'available'
  });

  const [pricing, setPricing] = useState({
    individualPrice: '',
    group5PlusPrice: '',
    group10PlusPrice: '',
    group20PlusPrice: ''
  });

  const [images, setImages] = useState([
    { imageUrl: '', imageAlt: '', displayOrder: 1 },
    { imageUrl: '', imageAlt: '', displayOrder: 2 },
    { imageUrl: '', imageAlt: '', displayOrder: 3 },
    { imageUrl: '', imageAlt: '', displayOrder: 4 },
    { imageUrl: '', imageAlt: '', displayOrder: 5 }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tour) {
      setFormData({
        name: tour?.name || '',
        destination: tour?.destination || '',
        duration: tour?.duration || '',
        description: tour?.description || '',
        educationalFocus: tour?.educationalFocus || '',
        studentLevel: tour?.studentLevel || 'school',
        tourType: tour?.tourType || 'cultural-heritage',
        status: tour?.status || 'draft',
        isFeatured: tour?.isFeatured || false,
        isNew: tour?.isNew || false,
        groupDiscountEnabled: tour?.groupDiscountEnabled !== false,
        availability: tour?.availability || 'available'
      });

      if (tour?.pricing) {
        setPricing({
          individualPrice: tour?.pricing?.individualPrice || '',
          group5PlusPrice: tour?.pricing?.group5PlusPrice || '',
          group10PlusPrice: tour?.pricing?.group10PlusPrice || '',
          group20PlusPrice: tour?.pricing?.group20PlusPrice || ''
        });
      }

      if (tour?.images && tour?.images?.length > 0) {
        const updatedImages = [...images];
        tour?.images?.forEach((img, index) => {
          if (index < 5) {
            updatedImages[index] = {
              imageUrl: img?.imageUrl || '',
              imageAlt: img?.imageAlt || '',
              displayOrder: img?.displayOrder || index + 1
            };
          }
        });
        setImages(updatedImages);
      }
    }
  }, [tour]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e?.target;
    setPricing(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages?.[index], [field]: value };
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    if (!formData?.name || !formData?.destination || !formData?.duration) {
      setError('Please fill in all required fields');
      return;
    }

    if (!pricing?.individualPrice) {
      setError('Please enter individual price');
      return;
    }

    try {
      setLoading(true);
      
      let tourId = tour?.id;
      
      if (tour) {
        await tourService?.updateTour(tour?.id, formData);
      } else {
        const newTour = await tourService?.createTour(formData);
        tourId = newTour?.id;
      }

      await tourService?.updateTourPricing(tourId, {
        individualPrice: parseFloat(pricing?.individualPrice),
        group5PlusPrice: pricing?.group5PlusPrice ? parseFloat(pricing?.group5PlusPrice) : null,
        group10PlusPrice: pricing?.group10PlusPrice ? parseFloat(pricing?.group10PlusPrice) : null,
        group20PlusPrice: pricing?.group20PlusPrice ? parseFloat(pricing?.group20PlusPrice) : null
      });

      if (tour) {
        for (const img of tour?.images || []) {
          await tourService?.deleteTourImage(img?.id);
        }
      }

      const validImages = images?.filter(img => img?.imageUrl && img?.imageAlt);
      if (validImages?.length > 0) {
        await tourService?.addTourImages(tourId, validImages);
      }

      onSave();
    } catch (err) {
      setError(err?.message || 'Failed to save tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-warm-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            {tour ? 'Edit Tour Package' : 'Add New Tour Package'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-md transition-smooth">
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <span className="text-error">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
            
            <Input
              label="Tour Name"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              required
              placeholder="e.g., Golden Triangle Heritage Tour"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Destination"
                name="destination"
                value={formData?.destination}
                onChange={handleInputChange}
                required
                placeholder="e.g., Delhi, Agra, Jaipur"
              />

              <Input
                label="Duration"
                name="duration"
                value={formData?.duration}
                onChange={handleInputChange}
                required
                placeholder="e.g., 5 Days / 4 Nights"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                name="description"
                value={formData?.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Detailed tour description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Educational Focus"
                name="educationalFocus"
                value={formData?.educationalFocus}
                onChange={handleInputChange}
                placeholder="e.g., History & Culture"
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Student Level</label>
                <select
                  name="studentLevel"
                  value={formData?.studentLevel}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tour Type</label>
                <select
                  name="tourType"
                  value={formData?.tourType}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="cultural-heritage">Cultural Heritage</option>
                  <option value="industrial-tour">Industrial Tour</option>
                  <option value="adventure-learning">Adventure Learning</option>
                  <option value="learning-camp">Learning Camp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                <select
                  name="status"
                  value={formData?.status}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
              <select
                name="availability"
                value={formData?.availability}
                onChange={handleInputChange}
                className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="available">Available</option>
                <option value="limited">Limited</option>
                <option value="soldout">Sold Out</option>
              </select>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData?.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-input"
                />
                <span className="text-sm text-foreground">Featured Tour</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData?.isNew}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-input"
                />
                <span className="text-sm text-foreground">New Tour</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="groupDiscountEnabled"
                  checked={formData?.groupDiscountEnabled}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-input"
                />
                <span className="text-sm text-foreground">Enable Group Discount</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Individual Price (₹)"
                name="individualPrice"
                type="number"
                value={pricing?.individualPrice}
                onChange={handlePricingChange}
                required
                placeholder="18500"
              />

              <Input
                label="Group 5+ Price (₹)"
                name="group5PlusPrice"
                type="number"
                value={pricing?.group5PlusPrice}
                onChange={handlePricingChange}
                placeholder="17000"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Group 10+ Price (₹)"
                name="group10PlusPrice"
                type="number"
                value={pricing?.group10PlusPrice}
                onChange={handlePricingChange}
                placeholder="16000"
              />

              <Input
                label="Group 20+ Price (₹)"
                name="group20PlusPrice"
                type="number"
                value={pricing?.group20PlusPrice}
                onChange={handlePricingChange}
                placeholder="15000"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Tour Images (Up to 5)</h3>
            
            {images?.map((image, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg space-y-3">
                <p className="text-sm font-medium text-foreground">Image {index + 1}</p>
                <Input
                  label="Image URL"
                  value={image?.imageUrl}
                  onChange={(e) => handleImageChange(index, 'imageUrl', e?.target?.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                <Input
                  label="Image Alt Text (Description)"
                  value={image?.imageAlt}
                  onChange={(e) => handleImageChange(index, 'imageAlt', e?.target?.value)}
                  placeholder="Detailed description of the image for accessibility"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {tour ? 'Update Tour' : 'Create Tour'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourFormModal;