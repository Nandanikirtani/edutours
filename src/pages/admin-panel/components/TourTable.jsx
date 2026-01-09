import React from 'react';
import Icon from '../../../components/AppIcon';


const TourTable = ({ tours, onEdit, onDelete, onManageSeo }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-success/10 text-success border-success/20', label: 'Published' },
      draft: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Draft' },
      archived: { color: 'bg-muted text-muted-foreground border-border', label: 'Archived' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-md border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  if (!tours || tours?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Map" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <p className="text-muted-foreground">No tours found. Add your first tour package.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Tour Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Destination</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Duration</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Price</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Images</th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours?.map((tour) => (
            <tr key={tour?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-foreground">{tour?.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {tour?.isFeatured && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">Featured</span>
                    )}
                    {tour?.isNew && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded">New</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-muted-foreground">{tour?.destination}</td>
              <td className="py-4 px-4 text-sm text-muted-foreground">{tour?.duration}</td>
              <td className="py-4 px-4">
                <p className="font-semibold text-foreground">
                  ₹{tour?.pricing?.individualPrice?.toLocaleString('en-IN')}
                </p>
                {tour?.groupDiscountEnabled && (
                  <p className="text-xs text-success">Group discount available</p>
                )}
              </td>
              <td className="py-4 px-4">{getStatusBadge(tour?.status)}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1">
                  <Icon name="Image" size={16} color="var(--color-muted-foreground)" />
                  <span className="text-sm text-muted-foreground">{tour?.images?.length || 0}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onManageSeo(tour)}
                    className="p-2 hover:bg-muted rounded-md transition-smooth"
                    title="Manage SEO"
                  >
                    <Icon name="Search" size={18} color="var(--color-primary)" />
                  </button>
                  <button
                    onClick={() => onEdit(tour)}
                    className="p-2 hover:bg-muted rounded-md transition-smooth"
                    title="Edit Tour"
                  >
                    <Icon name="Edit" size={18} color="var(--color-primary)" />
                  </button>
                  <button
                    onClick={() => onDelete(tour?.id)}
                    className="p-2 hover:bg-error/10 rounded-md transition-smooth"
                    title="Delete Tour"
                  >
                    <Icon name="Trash2" size={18} color="var(--color-error)" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable;