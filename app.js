/**
 * CLAIM READY - Interactive Logic
 * Design System: "Sorry Bravia: Emerald Editorial"
 */

document.addEventListener('DOMContentLoaded', () => {
  // Storage key
  const STORAGE_KEY = 'claim_ready_checklist_v1';

  // DOM Elements
  const checklistCards = document.querySelectorAll('.checklist-card');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressCountEl = document.getElementById('progress-count');
  const progressPercentEl = document.getElementById('progress-percent');
  const resetBtn = document.getElementById('reset-checklist-btn');
  const checkAllBtn = document.getElementById('check-all-btn');
  const printBtns = document.querySelectorAll('.action-print');
  const shareBtns = document.querySelectorAll('.action-share');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const phaseGroups = document.querySelectorAll('.phase-group');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Load saved state
  let checkedItems = new Set();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      checkedItems = new Set(JSON.parse(saved));
    }
  } catch (err) {
    console.warn('Could not read checklist from localStorage', err);
  }

  // Toast Helper
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Update Progress & UI
  function updateChecklistUI() {
    const total = checklistCards.length;
    let completedCount = 0;

    checklistCards.forEach((card) => {
      const stepId = card.getAttribute('data-step');
      const isChecked = checkedItems.has(stepId);

      if (isChecked) {
        card.classList.add('completed');
        card.setAttribute('aria-checked', 'true');
        completedCount++;
      } else {
        card.classList.remove('completed');
        card.setAttribute('aria-checked', 'false');
      }
    });

    // Update numbers
    if (progressCountEl) {
      progressCountEl.textContent = `${completedCount} of ${total}`;
    }
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
    if (progressPercentEl) {
      progressPercentEl.textContent = `${percent}%`;
    }
    if (progressBarFill) {
      progressBarFill.style.width = `${percent}%`;
    }

    // Update phase counters
    phaseGroups.forEach((group) => {
      const phaseId = group.getAttribute('data-phase');
      const groupCards = group.querySelectorAll('.checklist-card');
      const groupTotal = groupCards.length;
      let groupCompleted = 0;

      groupCards.forEach((c) => {
        if (checkedItems.has(c.getAttribute('data-step'))) {
          groupCompleted++;
        }
      });

      const counterEl = group.querySelector('.phase-counter');
      if (counterEl) {
        counterEl.textContent = `${groupCompleted}/${groupTotal} DONE`;
      }
    });

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedItems)));
    } catch (err) {
      console.warn('Could not save checklist to localStorage', err);
    }
  }

  // Click on checklist item
  checklistCards.forEach((card) => {
    // Accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'checkbox');

    const toggle = () => {
      const stepId = card.getAttribute('data-step');
      if (checkedItems.has(stepId)) {
        checkedItems.delete(stepId);
      } else {
        checkedItems.add(stepId);
      }
      updateChecklistUI();
    };

    card.addEventListener('click', (e) => {
      // Don't trigger if user clicked an external link inside
      if (e.target.tagName.toLowerCase() === 'a') return;
      toggle();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (checkedItems.size === 0) {
        showToast('Checklist is already cleared');
        return;
      }
      checkedItems.clear();
      updateChecklistUI();
      showToast('Checklist has been reset');
    });
  }

  // Check All Button
  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      checklistCards.forEach((card) => {
        checkedItems.add(card.getAttribute('data-step'));
      });
      updateChecklistUI();
      showToast('All 15 steps marked completed');
    });
  }

  // Filtering by Phase
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetPhase = tab.getAttribute('data-filter');

      phaseGroups.forEach((group) => {
        const groupPhase = group.getAttribute('data-phase');
        if (targetPhase === 'all' || targetPhase === groupPhase) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // Print Handlers
  printBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Reset filter before printing to ensure all 15 steps are visible
      phaseGroups.forEach((group) => (group.style.display = 'block'));
      filterTabs.forEach((t) => {
        if (t.getAttribute('data-filter') === 'all') t.classList.add('active');
        else t.classList.remove('active');
      });
      window.print();
    });
  });

  // Share Handlers
  shareBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: 'Claim Ready — Warranty Checklist',
        text: 'A free 15-step checklist for anyone about to file a warranty claim. Decided on facts, in writing.',
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          showToast('Shared successfully');
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyLinkFallback();
          }
        }
      } else {
        copyLinkFallback();
      }
    });
  });

  function copyLinkFallback() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => showToast('Checklist link copied to clipboard'))
      .catch(() => showToast('URL: ' + window.location.href));
  }

  // Copy Template Handlers
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-template-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const textToCopy = targetEl.innerText.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied
        `;
        showToast('Template copied to clipboard');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2200);
      }).catch((err) => {
        showToast('Failed to copy template: ' + err);
      });
    });
  });

  // Intersection Observer for graceful animations
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach((el) => observer.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  // Initialize UI with saved data
  updateChecklistUI();
});
