namespace SPECTOR.EmbeddedFrontend {
    export interface IVisualStateItem {
        time: number;
        commandStateId: number;
        VisualState: any;
        active: boolean;
    }
    export class VisualStateListItemComponent extends BaseComponent<IVisualStateItem> {
        public onVisualStateSelected: IStateEvent<IVisualStateItem>;

        constructor(eventConstructor: EventConstructor, logger: ILogger) {
            super(eventConstructor, logger);
            this.onVisualStateSelected = this.createEvent("onVisualStateSelected");
        }

        public render(state: IVisualStateItem, stateId: number): Element {
            const liHolder = document.createElement("li");
            if (state.active) {
                liHolder.className = "active";
                setTimeout(() => {
                    ScrollIntoViewHelper.scrollIntoView(liHolder);
                }, 1);
            }

            if (state.VisualState.Attachments) {
                for (const imageState of state.VisualState.Attachments) {
                    if (!imageState.src) {
                        continue;
                    }

                    const img = document.createElement("img");
                    img.src = encodeURI(imageState.src);
                    liHolder.appendChild(img);

                    if (state.VisualState.Attachments.length > 1) {
                        const attachment = document.createElement("span");
                        attachment.innerText = imageState.attachmentName;
                        liHolder.appendChild(attachment);
                    }
                    if (imageState.textureLayer) {
                        const layer = document.createElement("span");
                        layer.innerText = "Layer: " + imageState.textureLayer;
                        liHolder.appendChild(layer);
                    }
                    if (imageState.textureCubeMapFace) {
                        const face = document.createElement("span");
                        face.innerText = imageState.textureCubeMapFace;
                        liHolder.appendChild(face);
                    }
                }
            }
            else {
                const status = document.createElement("span");
                status.innerText = state.VisualState.FrameBufferStatus;
                liHolder.appendChild(status);
            }

            const fbo = document.createElement("span");
            if (state.VisualState.FrameBuffer) {
                fbo.innerText = "Frame buffer: " + state.VisualState.FrameBuffer.__SPECTOR_Object_TAG.id;
            }
            else {
                fbo.innerText = "Canvas frame buffer";
            }

            liHolder.appendChild(fbo);

            this.mapEventListener(liHolder, "click", "onVisualStateSelected", state, stateId);

            return liHolder;
        }
    }
}
