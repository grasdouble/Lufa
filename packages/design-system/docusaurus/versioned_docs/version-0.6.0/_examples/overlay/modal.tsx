import { Modal, Button, Stack, Input } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

export function LiveDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Welcome Modal">
        <p>This is a basic modal with a title and close button.</p>
        <p>You can close it by:</p>
        <ul>
          <li>Clicking the X button</li>
          <li>Clicking outside the modal (backdrop)</li>
          <li>Pressing the Escape key</li>
        </ul>
      </Modal>
    </div>
  );
}

export function SizeExample() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px' }}>
      <Stack direction="row" spacing="medium">
        <Button onClick={() => setOpenModal('small')}>Small Modal</Button>
        <Button onClick={() => setOpenModal('medium')}>Medium Modal</Button>
        <Button onClick={() => setOpenModal('large')}>Large Modal</Button>
        <Button onClick={() => setOpenModal('fullscreen')}>Fullscreen Modal</Button>
      </Stack>

      <Modal
        open={openModal === 'small'}
        onClose={() => setOpenModal(null)}
        title="Small Modal"
        size="small"
      >
        <p>This is a small modal, perfect for simple alerts and confirmations.</p>
      </Modal>

      <Modal
        open={openModal === 'medium'}
        onClose={() => setOpenModal(null)}
        title="Medium Modal"
        size="medium"
      >
        <p>This is a medium modal (default size), suitable for most use cases.</p>
        <p>It provides a good balance between content space and screen coverage.</p>
      </Modal>

      <Modal
        open={openModal === 'large'}
        onClose={() => setOpenModal(null)}
        title="Large Modal"
        size="large"
      >
        <p>This is a large modal, great for forms and detailed content.</p>
        <p>It provides more horizontal space for complex layouts.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </Modal>

      <Modal
        open={openModal === 'fullscreen'}
        onClose={() => setOpenModal(null)}
        title="Fullscreen Modal"
        size="fullscreen"
      >
        <div>
          <p>This is a fullscreen modal, covering the entire viewport.</p>
          <p>Use this for immersive experiences like:</p>
          <ul>
            <li>Image or video galleries</li>
            <li>Complex multi-step workflows</li>
            <li>Rich content viewers</li>
            <li>Full-page forms</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export function WithFooterExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal with Footer"
        footer={
          <Stack direction="row" spacing="medium" justify="end">
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => alert('Action confirmed!')}>Confirm</Button>
          </Stack>
        }
      >
        <p>This modal includes a footer with action buttons.</p>
        <p>The footer is useful for:</p>
        <ul>
          <li>Confirmation dialogs</li>
          <li>Form submission buttons</li>
          <li>Multi-step navigation</li>
        </ul>
      </Modal>
    </div>
  );
}

export function ConfirmationExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsDeleting(false);
    setIsOpen(false);
    alert('Item deleted successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Confirmation Dialog Pattern</h3>
      <Button color="danger" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Deletion"
        size="small"
        closeOnBackdropClick={false}
        footer={
          <Stack direction="row" spacing="medium" justify="end">
            <Button variant="outlined" onClick={() => setIsOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => {
                void handleDelete();
              }}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Stack>
        }
      >
        <p>Are you sure you want to delete this item?</p>
        <p style={{ color: '#d32f2f', fontWeight: 'bold' }}>This action cannot be undone.</p>
      </Modal>
    </div>
  );
}

export function FormExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsOpen(false);
    alert('Form submitted successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Form Modal Pattern</h3>
      <Button onClick={() => setIsOpen(true)}>Open Contact Form</Button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Contact Us"
        size="medium"
        footer={
          <Stack direction="row" spacing="medium" justify="end">
            <Button variant="outlined" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" form="contact-form" loading={isSubmitting}>
              Send Message
            </Button>
          </Stack>
        }
      >
        <form
          id="contact-form"
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        >
          <Stack direction="column" spacing="medium">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              fullWidth
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              fullWidth
            />
            <Input
              label="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              fullWidth
            />
          </Stack>
        </form>
      </Modal>
    </div>
  );
}

export function CloseOptionsExample() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div style={{ padding: '20px' }}>
      <Stack direction="column" spacing="medium">
        <div>
          <h4>Default (All Close Methods)</h4>
          <Button onClick={() => setOpenModal('default')}>Open Default Modal</Button>
        </div>

        <div>
          <h4>No Backdrop Click Close</h4>
          <Button onClick={() => setOpenModal('noBackdrop')}>Open Modal</Button>
        </div>

        <div>
          <h4>No Escape Key Close</h4>
          <Button onClick={() => setOpenModal('noEscape')}>Open Modal</Button>
        </div>

        <div>
          <h4>Explicit Close Only</h4>
          <Button onClick={() => setOpenModal('explicit')}>Open Modal</Button>
        </div>
      </Stack>

      <Modal
        open={openModal === 'default'}
        onClose={() => setOpenModal(null)}
        title="Default Modal"
      >
        <p>This modal can be closed by:</p>
        <ul>
          <li>✅ Clicking the backdrop</li>
          <li>✅ Pressing Escape key</li>
          <li>✅ Clicking the X button</li>
        </ul>
      </Modal>

      <Modal
        open={openModal === 'noBackdrop'}
        onClose={() => setOpenModal(null)}
        title="No Backdrop Click"
        closeOnBackdropClick={false}
      >
        <p>This modal can be closed by:</p>
        <ul>
          <li>❌ Clicking the backdrop (disabled)</li>
          <li>✅ Pressing Escape key</li>
          <li>✅ Clicking the X button</li>
        </ul>
        <p style={{ marginTop: '16px', fontStyle: 'italic' }}>
          Try clicking outside - it won&apos;t close!
        </p>
      </Modal>

      <Modal
        open={openModal === 'noEscape'}
        onClose={() => setOpenModal(null)}
        title="No Escape Key"
        closeOnEscape={false}
      >
        <p>This modal can be closed by:</p>
        <ul>
          <li>✅ Clicking the backdrop</li>
          <li>❌ Pressing Escape key (disabled)</li>
          <li>✅ Clicking the X button</li>
        </ul>
        <p style={{ marginTop: '16px', fontStyle: 'italic' }}>
          Try pressing Escape - it won&apos;t close!
        </p>
      </Modal>

      <Modal
        open={openModal === 'explicit'}
        onClose={() => setOpenModal(null)}
        title="Explicit Close Only"
        closeOnBackdropClick={false}
        closeOnEscape={false}
      >
        <p>This modal can ONLY be closed by:</p>
        <ul>
          <li>❌ Clicking the backdrop (disabled)</li>
          <li>❌ Pressing Escape key (disabled)</li>
          <li>✅ Clicking the X button</li>
        </ul>
        <p style={{ marginTop: '16px', fontWeight: 'bold', color: '#d32f2f' }}>
          ⚠️ Use this pattern sparingly, only for critical actions!
        </p>
      </Modal>
    </div>
  );
}

export function BasicExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Basic Modal Usage</h3>
      <Button onClick={() => setIsOpen(true)}>Open Basic Modal</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Basic Modal Example">
        <div>
          <p>This is a simple modal with basic content.</p>
          <p>
            Modals are great for displaying information that requires user attention without
            navigating away from the current page.
          </p>
        </div>
      </Modal>
    </div>
  );
}
