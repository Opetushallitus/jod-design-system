import { useState } from 'react';
import { TagsInput as ArkTagsInput, TagsInputValueChangeDetails as ArkValueChangeDetails } from '@ark-ui/react';

export interface TagsInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  onValueChange: (values: string[]) => void;
  inputPosition?: 'top' | 'bottom';
}

export const TagsInput = ({ label, placeholder, tags, onValueChange, inputPosition = 'top' }: TagsInputProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const highlightChange = (details: ArkTagsInput.HighlightChangeDetails) => {
    setSelectedTag(details.highlightedValue);
  };

  const onValueChangeHandler = (details: ArkValueChangeDetails) => {
    onValueChange(details.value);
  };

  return (
    <ArkTagsInput.Root
      className="flex flex-col"
      value={tags}
      onHighlightChange={highlightChange}
      onValueChange={onValueChangeHandler}
      validate={(details) => {
        return !details.value.includes(details.inputValue);
      }}
      onFocusOutside={() => setSelectedTag(null)}
      onBlur={() => setSelectedTag(null)}
    >
      <ArkTagsInput.Context>
        {(tagsInput) => (
          <>
            <ArkTagsInput.Label className="mb-4 text-form-label text-primary-gray">{label}</ArkTagsInput.Label>
            <div
              className={`${tagsInput.value.length > 0 ? 'gap-3' : ''} flex flex-col rounded-[10px] border-[5px] border-border-gray p-5`.trim()}
            >
              {inputPosition === 'top' && (
                <ArkTagsInput.Input placeholder={placeholder && `(${placeholder})`} className="w-full" />
              )}
              <ArkTagsInput.Control className="flex flex-wrap gap-3">
                {tagsInput.value.map((value, index) => (
                  <ArkTagsInput.Item
                    key={index}
                    index={index}
                    value={value}
                    className={`${selectedTag == value ? 'outline outline-2 outline-offset-[1.5px]' : ''} group inline-flex select-none items-center justify-center rounded-sm border-2 border-secondary-gray px-4 text-tag`.trim()}
                  >
                    <ArkTagsInput.ItemPreview>
                      <div className="inline-flex items-center gap-3">
                        <ArkTagsInput.ItemText className="hyphens-auto text-secondary-gray group-hover:underline">
                          {value}
                        </ArkTagsInput.ItemText>
                        <ArkTagsInput.ItemDeleteTrigger className="flex">
                          <span className="material-symbols-outlined size-24-bold h-fit select-none text-secondary-gray">
                            {'close'}
                          </span>
                        </ArkTagsInput.ItemDeleteTrigger>
                      </div>
                    </ArkTagsInput.ItemPreview>
                    <ArkTagsInput.ItemInput className="py-[5px]" />
                  </ArkTagsInput.Item>
                ))}
              </ArkTagsInput.Control>
              {inputPosition === 'bottom' && (
                <ArkTagsInput.Input placeholder={placeholder && `(${placeholder})`} className="w-full" />
              )}
            </div>
          </>
        )}
      </ArkTagsInput.Context>
    </ArkTagsInput.Root>
  );
};
