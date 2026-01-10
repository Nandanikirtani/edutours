import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { tourService } from '../../../services/tourService';

const SeoFormModal = ({ tour, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    pageUrl: '',
    pageTitle: '',
    metaDescription: '',
    metaKeywords: []
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingSeo, setIsLoadingSeo] = useState(false);

  useEffect(() => {
    if (tour) {
      if (tour?.seoMetadata) {
        setFormData({
          pageUrl: tour?.seoMetadata?.pageUrl || '',
          pageTitle: tour?.seoMetadata?.pageTitle || '',
          metaDescription: tour?.seoMetadata?.metaDescription || '',
          metaKeywords: tour?.seoMetadata?.metaKeywords || []
        });
      } else {
        setFormData({
          pageUrl: `/tour-package-details?id=${tour?.id}`,
          pageTitle: `${tour?.name} - Educational Tours`,
          metaDescription: tour?.description || '',
          metaKeywords: []
        });
      }
    } else {
      loadCatalogSeo();
    }
  }, [tour]);

  const loadCatalogSeo = async () => {
    try {
      setIsLoadingSeo(true);
      const catalogSeo = await tourService?.getCatalogSeo();
      if (catalogSeo) {
        setFormData({
          pageUrl: catalogSeo?.pageUrl || '/tour-catalog',
          pageTitle: catalogSeo?.pageTitle || '',
          metaDescription: catalogSeo?.metaDescription || '',
          metaKeywords: catalogSeo?.metaKeywords || []
        });
      } else {
        setFormData({
          pageUrl: '/tour-catalog',
          pageTitle: 'Educational Tour Packages - Browse All Tours',
          metaDescription: 'Browse our comprehensive catalog of educational tour packages for students.',
          metaKeywords: []
        });
      }
    } catch (err) {
      setError(err?.message || 'Failed to load SEO data');
    } finally {
      setIsLoadingSeo(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddKeyword = () => {
    if (keywordInput?.trim() && !formData?.metaKeywords?.includes(keywordInput?.trim())) {
      setFormData(prev => ({
        ...prev,
        metaKeywords: [...prev?.metaKeywords, keywordInput?.trim()]
      }));
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      metaKeywords: prev?.metaKeywords?.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    if (!formData?.pageTitle || !formData?.metaDescription) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      if (tour) {
        await tourService?.updateSeoMetadata(tour?.id, formData);
      } else {
        await tourService?.updateCatalogSeo(formData);
      }

      onSave();
    } catch (err) {
      setError(err?.message || 'Failed to save SEO metadata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-warm-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-heading font-bold text-foreground">
            {tour ? `SEO Settings - ${tour?.name}` : 'Catalog Page SEO Settings'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-md transition-smooth">
            <Icon name="X" size={24} />
          </button>
        </div>

        {isLoadingSeo ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-center gap-3">
                <Icon name="AlertCircle" size={20} color="var(--color-error)" />
                <span className="text-error">{error}</span>
              </div>
            )}

            <Input
              label="Page URL"
              name="pageUrl"
              value={formData?.pageUrl}
              onChange={handleInputChange}
              required
              description="The URL path for this page"
              disabled={!!tour}
            />

            <Input
              label="Page Title"
              name="pageTitle"
              value={formData?.pageTitle}
              onChange={handleInputChange}
              required
              description="Appears in browser tab and search results (50-60 characters recommended)"
              placeholder="e.g., Golden Triangle Heritage Tour - Educational Tours India"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Meta Description <span className="text-destructive">*</span>
              </label>
              <textarea
                name="metaDescription"
                value={formData?.metaDescription}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Brief description for search engines (150-160 characters recommended)"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData?.metaDescription?.length || 0} characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Meta Keywords</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && (e?.preventDefault(), handleAddKeyword())}
                  placeholder="Enter keyword and press Enter"
                  className="flex-1 h-10 px-3 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="button" onClick={handleAddKeyword} variant="outline">
                  Add
                </Button>
              </div>
              
              {formData?.metaKeywords?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData?.metaKeywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="hover:text-error transition-smooth"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-2">SEO Preview</h3>
              <div className="space-y-2">
                <p className="text-lg text-primary font-medium">{formData?.pageTitle || 'Page Title'}</p>
                <p className="text-xs text-success">{formData?.pageUrl || '/page-url'}</p>
                <p className="text-sm text-muted-foreground">
                  {formData?.metaDescription || 'Meta description will appear here...'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={loading}>
                Save SEO Settings
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SeoFormModal;