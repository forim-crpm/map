import { useAppStore } from "@/stores/app";

export default class ResetMapExtentControl {
  _map: any
  _container: any

  onAdd(map: any) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    const btn = document.createElement("button");
    btn.className = 'maplibregl-ctrl-zoom-extent'
    const span = document.createElement("span");
    span.className = 'maplibregl-ctrl-icon'
    btn.appendChild(span)
    this._container.appendChild(btn);
    this._container.addEventListener('click', () => {
      useAppStore().triggerZoomReset = !useAppStore().triggerZoomReset 
    })
    
    return this._container;
  }
  
  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}