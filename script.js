// Collaborator management system for SfidaMi.site
class CollaboratorManager {
    constructor() {
        this.collaborators = this.loadCollaborators();
        this.form = document.getElementById('collaboratorForm');
        this.collaboratorsList = document.getElementById('collaboratorsList');
        
        this.bindEvents();
        this.renderCollaborators();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCollaborator();
        });
    }

    addCollaborator() {
        const formData = new FormData(this.form);
        const collaborator = {
            id: Date.now().toString(),
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            role: formData.get('role'),
            dateAdded: new Date().toLocaleDateString('it-IT')
        };

        // Validate input
        if (!this.validateCollaborator(collaborator)) {
            this.showMessage('Per favore compila tutti i campi correttamente.', 'error');
            return;
        }

        // Check for duplicate email
        if (this.collaborators.some(c => c.email === collaborator.email)) {
            this.showMessage('Un collaboratore con questa email esiste già.', 'error');
            return;
        }

        // Add collaborator
        this.collaborators.push(collaborator);
        this.saveCollaborators();
        this.renderCollaborators();
        this.form.reset();
        
        this.showMessage(`Collaboratore ${collaborator.name} aggiunto con successo!`, 'success');
    }

    validateCollaborator(collaborator) {
        return collaborator.name && 
               collaborator.email && 
               collaborator.role &&
               this.isValidEmail(collaborator.email);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    deleteCollaborator(id) {
        if (confirm('Sei sicuro di voler eliminare questo collaboratore?')) {
            this.collaborators = this.collaborators.filter(c => c.id !== id);
            this.saveCollaborators();
            this.renderCollaborators();
            this.showMessage('Collaboratore eliminato con successo.', 'success');
        }
    }

    renderCollaborators() {
        if (this.collaborators.length === 0) {
            this.collaboratorsList.innerHTML = `
                <div class="no-collaborators">
                    <p style="text-align: center; color: #666; font-style: italic;">
                        Nessun collaboratore aggiunto ancora.
                    </p>
                </div>
            `;
            return;
        }

        this.collaboratorsList.innerHTML = this.collaborators.map(collaborator => `
            <div class="collaborator-card" data-id="${collaborator.id}">
                <button class="delete-btn" onclick="collaboratorManager.deleteCollaborator('${collaborator.id}')">
                    ✕
                </button>
                <div class="collaborator-name">${this.escapeHtml(collaborator.name)}</div>
                <div class="collaborator-email">📧 ${this.escapeHtml(collaborator.email)}</div>
                <div class="collaborator-role">${this.getRoleLabel(collaborator.role)}</div>
                <div style="font-size: 0.9em; color: #888; margin-top: 10px;">
                    Aggiunto il: ${collaborator.dateAdded}
                </div>
            </div>
        `).join('');
    }

    getRoleLabel(role) {
        const roleLabels = {
            'developer': '💻 Sviluppatore',
            'designer': '🎨 Designer',
            'manager': '👔 Project Manager',
            'tester': '🧪 Tester'
        };
        return roleLabels[role] || role;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        document.querySelectorAll('.success-message, .error-message').forEach(el => el.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        
        const form = document.getElementById('collaboratorForm');
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    loadCollaborators() {
        try {
            const saved = localStorage.getItem('sfidami_collaborators');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading collaborators:', error);
            return [];
        }
    }

    saveCollaborators() {
        try {
            localStorage.setItem('sfidami_collaborators', JSON.stringify(this.collaborators));
        } catch (error) {
            console.error('Error saving collaborators:', error);
        }
    }

    // Export functionality for future use
    exportCollaborators() {
        const data = JSON.stringify(this.collaborators, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collaboratori_sfidami.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Get statistics
    getStats() {
        const stats = {
            total: this.collaborators.length,
            byRole: {}
        };
        
        this.collaborators.forEach(collaborator => {
            stats.byRole[collaborator.role] = (stats.byRole[collaborator.role] || 0) + 1;
        });
        
        return stats;
    }
}

// Initialize the collaborator manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.collaboratorManager = new CollaboratorManager();
    
    // Log current statistics
    console.log('SfidaMi.site Collaborator Manager inizializzato');
    console.log('Statistiche:', window.collaboratorManager.getStats());
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('collaboratorForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});