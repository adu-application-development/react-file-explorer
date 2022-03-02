import PropTypes, { InferProps } from 'prop-types';

export function FileExplorer({
  initialEntryList,
  /* === */
  width,
  height,
  className,
  /* === */
  beforeMount,
  onMount,
  onChange,
  onRename,
}: InferProps<typeof FileExplorer.propTypes>) {
  const root = 
}

FileExplorer.propTypes = {
  initialEntryList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })),
  /* === */
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  /* === */
  beforeMount: PropTypes.func,
  onMount: PropTypes.func,
  onChange: PropTypes.func,
  onRename: PropTypes.func,
}

FileExplorer.defaultProps = {
  initialList: [],
  /* === */
  width: '100%',
  height: '100%',
  className: 'file-explorer',
  /* === */
  beforeMount: () => { },
  onMount: () => { },
  onChange: () => { },
  onRename: () => { },
}