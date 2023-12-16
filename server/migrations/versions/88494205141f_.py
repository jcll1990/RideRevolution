"""empty message

Revision ID: 88494205141f
Revises: e0f7656d84cd
Create Date: 2023-11-08 15:44:22.518090

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88494205141f'
down_revision = 'e0f7656d84cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], name=op.f('fk_user_order_order_id_order')),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_user_order_user_id_user')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.drop_constraint('fk_order_item_id', type_='foreignkey')
        batch_op.drop_constraint('fk_order_user_id', type_='foreignkey')
        batch_op.drop_column('item_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('item_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_order_user_id', 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key('fk_order_item_id', 'item', ['item_id'], ['id'])

    op.drop_table('user_order')
    # ### end Alembic commands ###
