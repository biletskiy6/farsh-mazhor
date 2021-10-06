<template>
  <div
    v-quill:myQuillEditor="editorOption"
    class="quill-editor"
    :content="content"
    @change="onEditorChange($event)"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  ></div>
</template>

<script>
import debounce from 'lodash/debounce'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'
export default {
  name: 'QuillEditor',
  props: {
    content: {
      type: String,
      required: false,
      default: '',
    },
    editorOption: {
      type: Object,
      default: () => ({
        placeholder: '...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [({ header: 1 }, { header: 2 })],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image'],
          ],
          syntax: {
            // eslint-disable-next-line no-undef
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      }),
    },
  },
  data() {
    return {}
  },
  methods: {
    onEditorChange: debounce(function (value) {
      this.$emit('input', value.html)
    }, 466),
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {},
    saveContent() {
      console.log(this.content)
    },
  },
}
</script>
