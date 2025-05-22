<template>
  <div class="user-detail-view">
    <router-link to="/" class="back-link">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      Back to Users
    </router-link>
    
    <div v-if="userStore.currentUser" class="user-details-display">
      <div class="user-header">
        <div class="user-avatar large">
          <span>{{ userInitials }}</span>
        </div>
        <div class="user-identity">
          <h2>{{ userStore.currentUser.name }}</h2>
          <p class="username">@{{ userStore.currentUser.username }}</p>
        </div>
      </div>
      
      <div class="detail-sections">
        <div class="detail-section">
          <h3 class="section-title">Contact Information</h3>
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-icon">
                <font-awesome-icon :icon="['far', 'envelope']" />
              </div>
              <div class="detail-content">
                <p class="detail-label">Email</p>
                <p class="detail-value">{{ userStore.currentUser.email }}</p>
              </div>
            </div>
            
            <div class="detail-item">
              <div class="detail-icon">
                <font-awesome-icon :icon="['fas', 'phone']" />
              </div>
              <div class="detail-content">
                <p class="detail-label">Phone</p>
                <p class="detail-value">{{ userStore.currentUser.phone }}</p>
              </div>
            </div>
            
            <div class="detail-item">
              <div class="detail-icon">
                <font-awesome-icon :icon="['fas', 'globe']" />
              </div>
              <div class="detail-content">
                <p class="detail-label">Website</p>
                <p class="detail-value">
                  <a :href="`http://${userStore.currentUser.website}`" target="_blank">
                    {{ userStore.currentUser.website }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">Address</h3>
          <div class="address-card">
            <div class="address-header">
              <font-awesome-icon :icon="['fas', 'location-dot']" />
              <p>{{ userStore.currentUser.address.street }}, {{ userStore.currentUser.address.suite }}</p>
            </div>
            <p>{{ userStore.currentUser.address.city }}, {{ userStore.currentUser.address.zipcode }}</p>
            <div class="geo-info">
              <font-awesome-icon :icon="['fas', 'map-pin']" />
              <span>Coordinates: {{ userStore.currentUser.address.geo.lat }}, {{ userStore.currentUser.address.geo.lng }}</span>
            </div>
          </div>
        </div>
        
        <div class="detail-section">
          <h3 class="section-title">Company</h3>
          <div class="company-card">
            <h4>{{ userStore.currentUser.company.name }}</h4>
            <p class="company-bs">{{ userStore.currentUser.company.bs }}</p>
            <div class="company-catchphrase">
              <font-awesome-icon :icon="['fas', 'quote-left']" />
              <p>{{ userStore.currentUser.company.catchPhrase }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="userStore.isLoadingDetail" class="loading-container">
      <LoadingSpinner />
    </div>
    
    <div v-else-if="userStore.errorDetail" class="error-container">
      <ErrorMessage :message="userStore.errorDetail" />
    </div>
    
    <div v-else class="empty-container">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
      <p>User data not available.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '@/store/userStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

// eslint-disable-next-line
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
})

const userStore = useUserStore()

const userInitials = computed(() => {
  if (!userStore.currentUser) return '';
  
  const nameParts = userStore.currentUser.name.split(' ');
  return nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    : nameParts[0][0].toUpperCase();
});

onMounted(() => {
  userStore.fetchUserById(props.id)
})

onUnmounted(() => {
  userStore.clearCurrentUser()
})
</script>

<style scoped>
.user-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 20px;
  color: #64748b;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #334155;
  text-decoration: none;
}

.user-details-display {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}

.user-header {
  padding: 30px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar.large {
  width: 90px;
  height: 90px;
  font-size: 2.2rem;
}

.user-identity h2 {
  margin: 0 0 6px 0;
  font-size: 1.8rem;
}

.user-identity .username {
  margin: 0;
  color: #64748b;
  font-size: 1.1rem;
}

.detail-sections {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section-title {
  font-size: 1.25rem;
  color: #1e293b;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.detail-content {
  flex-grow: 1;
}

.detail-label {
  margin: 0 0 4px 0;
  color: #64748b;
  font-size: 0.9rem;
}

.detail-value {
  margin: 0;
  color: #334155;
  font-weight: 500;
}

.address-card, .company-card {
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.address-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  color: #334155;
  font-weight: 500;
}

.address-card p {
  margin: 0 0 10px 0;
  color: #475569;
}

.geo-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 10px;
}

.company-card h4 {
  margin: 0 0 8px 0;
  color: #334155;
  font-size: 1.1rem;
}

.company-bs {
  margin: 0 0 16px 0;
  color: #475569;
  text-transform: capitalize;
}

.company-catchphrase {
  display: flex;
  gap: 10px;
  color: #64748b;
  font-style: italic;
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
}

.company-catchphrase p {
  margin: 0;
}

.loading-container, .error-container, .empty-container {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.empty-container i {
  font-size: 3rem;
  color: #94a3b8;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .user-header {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>