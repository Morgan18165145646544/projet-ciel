document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmNewPasswordInput = document.getElementById('confirmNewPassword');
    const messageDisplay = document.getElementById('forgotPasswordMessage');

    const toggleNewPasswordButton = document.getElementById('toggleNewPassword');
    const eyeOpenNew = document.getElementById('eyeOpenNew');
    const eyeClosedNew = document.getElementById('eyeClosedNew');

    const toggleConfirmPasswordButton = document.getElementById('toggleConfirmPassword');
    const eyeOpenConfirm = document.getElementById('eyeOpenConfirm');
    const eyeClosedConfirm = document.getElementById('eyeClosedConfirm');

    // Toggle visibility for New Password field
    toggleNewPasswordButton.addEventListener('click', () => {
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);
        eyeOpenNew.classList.toggle('hidden');
        eyeClosedNew.classList.toggle('hidden');
    });

    // Toggle visibility for Confirm New Password field
    toggleConfirmPasswordButton.addEventListener('click', () => {
        const type = confirmNewPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmNewPasswordInput.setAttribute('type', type);
        eyeOpenConfirm.classList.toggle('hidden');
        eyeClosedConfirm.classList.toggle('hidden');
    });

    forgotPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const email = emailInput.value;
        const newPassword = newPasswordInput.value;
        const confirmNewPassword = confirmNewPasswordInput.value;

        messageDisplay.textContent = '';
        messageDisplay.classList.remove('error', 'success');

        // Basic email validation
        if (!email || !email.includes('@') || !email.includes('.')) {
            messageDisplay.textContent = 'Veuillez entrer une adresse e-mail valide.';
            messageDisplay.classList.add('error');
            return;
        }

        // Password validation (consistent with create-account)
        if (newPassword.length < 7) {
            messageDisplay.textContent = 'Le nouveau mot de passe doit avoir au moins 7 caractères.';
            messageDisplay.classList.add('error');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            messageDisplay.textContent = 'Les mots de passe ne correspondent pas.';
            messageDisplay.classList.add('error');
            return;
        }

        // Retrieve users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || {};

        // Find the username associated with the email (simulated)
        // In a real app, you'd look up the email in your database to find the user.
        let foundUsername = null;
        for (const username in users) {
            // This is a very basic simulation. In a real app, email would be stored with the user.
            // For simplicity, we'll assume the email is the username for this simulation,
            // or we'd need a more complex user object in localStorage.
            // Let's assume for this flow, the email is used to identify the user.
            // If the user's username is also their email, this works.
            // If not, we'd need a mapping.
            // For now, let's just check if the email matches a specific hardcoded user or a user in localStorage.

            // To make it work with existing localStorage, we need to map emails to usernames.
            // Since localStorage currently stores username:password, we can't easily find by email.
            // Let's simplify: if the email matches a hardcoded 'admin123@gmail.com' or 'marc.dupuit@gmail.com',
            // we'll simulate a reset for a corresponding hardcoded username.
            // For other emails, we'll just show a generic success message.

            // For a more robust simulation, users in localStorage should be objects like:
            // { "username": "...", "password": "...", "email": "..." }
            // For now, we'll stick to the hardcoded email checks for specific redirections.

            // If the email matches a known user, update their password.
            // This part is a simplification. In a real app, you'd verify the email first.
            if (email === 'admin123@gmail.com') {
                users['Admin'] = newPassword; // Update password for 'Admin' user
                localStorage.setItem('users', JSON.stringify(users));
                messageDisplay.textContent = 'Mot de passe réinitialisé pour Admin ! Redirection...';
                messageDisplay.classList.add('success');
                setTimeout(() => {
                    window.location.href = '../success-page.html'; // Updated path
                }, 1500);
                return;
            } else if (email === 'marc.dupuit@gmail.com') {
                // Assuming 'marc.dupuit@gmail.com' corresponds to a username like 'marc.dupuit'
                // You would need to ensure 'marc.dupuit' exists in localStorage or create it.
                // For this example, let's just update a placeholder username if it exists.
                // If 'marc.dupuit' is not a registered username, this won't work.
                // To make it work, we'd need to store email with username during account creation.
                // For now, let's just simulate success for this email.
                // If you want to actually update a user 'marc.dupuit', you need to create that user first.

                // If a user with the email 'marc.dupuit@gmail.com' was created with username 'marc.dupuit'
                // then you could update it like:
                // if (users['marc.dupuit']) {
                //     users['marc.dupuit'] = newPassword;
                //     localStorage.setItem('users', JSON.stringify(users));
                //     messageDisplay.textContent = 'Mot de passe réinitialisé pour Marc Dupuit ! Redirection...';
                //     messageDisplay.classList.add('success');
                //     setTimeout(() => {
                //         window.location.href = '../success-page.html';
                //     }, 1500);
                //     return;
                // } else {
                //     messageDisplay.textContent = 'Aucun compte trouvé avec cette adresse e-mail.';
                //     messageDisplay.classList.add('error');
                //     return;
                // }
                // Since we don't have a direct email-to-username mapping in localStorage currently,
                // and the request was to open create-account.html, let's stick to that.
                messageDisplay.textContent = 'E-mail Marc Dupuit détecté. Redirection vers la page de création de compte...';
                messageDisplay.classList.add('success');
                setTimeout(() => {
                    window.location.href = '../create-account/create-account.html'; // Updated path
                }, 1500);
                return;

            }
        }

        // If email is not 'admin123@gmail.com' or 'marc.dupuit@gmail.com'
        // Simulate a generic password reset success if the email is valid.
        messageDisplay.textContent = `Votre mot de passe a été réinitialisé. Vous pouvez maintenant vous connecter.`;
        messageDisplay.classList.add('success');
        
        // Optionally, clear the input fields
        emailInput.value = '';
        newPasswordInput.value = '';
        confirmNewPasswordInput.value = '';

        // Redirect back to the login page after a delay for general cases
        setTimeout(() => {
            window.location.href = '../index.html'; // Updated path
        }, 2000); // Redirect after 2 seconds
    });
});
