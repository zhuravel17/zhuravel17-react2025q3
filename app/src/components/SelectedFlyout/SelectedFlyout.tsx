import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { clearAllSelected } from '../../store/selectedSlice';
import './SelectedFlyout.styles.css';
import { Character } from '../../types/character';
import { API_URL } from '../../consts/urlConst';

export function SelectedFlyout(): ReactElement | null {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.selected.selected);
  if (selected.length === 0) return null;

  const handleUnsellectAll = (): void => {
    dispatch(clearAllSelected());
  };

  const handleDownload = (): void => {
    const headers = ['Name', 'Status', 'Location', 'URL'];
    const rows = selected.map((item: Character) => [
      item.name,
      item.status,
      item.location.name,
      `${API_URL}/${item.id}`,
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map((x) => `"${x}"`).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selected.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flyout">
      <div>{selected.length} items are selected</div>
      <div className="flyout-buttons">
        <button onClick={handleUnsellectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}
