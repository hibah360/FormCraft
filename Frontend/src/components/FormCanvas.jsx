import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";

import SortableField from "./SortableField";
import InlineEditableText from "./InlineEditableText";

function FormCanvas({
    fields,
    selectedFieldId,
    onSelectField,
    onDeleteField,
    onReorderFields,
    formTitle,
    formDescription,
    onUpdateForm,
}) {
    function handleDragEnd(event) {
        if (event.canceled) return;

        const source = event.operation.source;

        if (isSortable(source)) {
            const { initialIndex, index } = source;

            if (initialIndex !== index) {
                onReorderFields(initialIndex, index);
            }
        }
    }

    return (
        <section className="panel form-panel">

            <div className="form-heading">
                {/* <span className="form-badge">NEW FORM</span> */}

                <InlineEditableText
                    value={formTitle}
                    onSave={(value) => onUpdateForm({ formTitle: value })}
                    placeholder="Enter form title"
                />

                <InlineEditableText
                    value={formDescription}
                    onSave={(value) =>
                        onUpdateForm({ formDescription: value })
                    }
                    placeholder="Add a description to explain the purpose of your form."
                    multiline
                />
            </div>


            {fields.length === 0 ? (
                <div className="empty-canvas">
                    <div className="empty-canvas-icon">＋</div>

                    <h3>Your form is empty</h3>

                    <p>
                        Choose a field type from the left panel to get
                        started.
                    </p>
                </div>
            ) : (
                <DragDropProvider onDragEnd={handleDragEnd}>
                    <div className="canvas-fields">
                        {fields.map((field, index) => (
                            <SortableField
                                key={field.id}
                                field={field}
                                index={index}
                                selected={selectedFieldId === field.id}
                                onSelect={onSelectField}
                                onDelete={onDeleteField}
                            />
                        ))}
                    </div>
                </DragDropProvider>
            )}
        </section>
    );
}

export default FormCanvas;
